# Task App - Frontend Build Prompt

This project already has a Gencow backend. Build the frontend from the backend contract below.

> Frontend choice: implement new screens with Vite + React.
> Use Next.js, `app/`, `pages/`, `layout.tsx`, or `next.config.*` only when the user explicitly asks for Next.js or SSR.
> The examples assume Vite with `import.meta.env.VITE_API_URL`, `src/main.tsx`, and `src/App.tsx`.

> Official Gencow reference: https://docs.gencow.com/llms-full.txt

## Implemented Backend

- `gencow/schema.ts`: database tables for `tasks` and `files`
- `gencow/tasks.ts`: task CRUD, including `list`, `get`, `create`, `update`, and `delete`
- `gencow/files.ts`: file upload and file listing

## Frontend Setup

### Install dependencies

```bash
pnpm add @gencow/client @gencow/react lucide-react
```

### Runtime client

```tsx
// src/lib/gencow.ts
import { createAuthClient, createGencowClient } from "@gencow/client";
import { api } from "@/gencow/api";

export const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:5456";
export const auth = createAuthClient(baseUrl);
export const apiClient = createGencowClient({ api, baseUrl, auth });
export const { signIn, signUp, signOut, store } = auth;
export { useAuth } from "@gencow/react";
```

### Provider

```tsx
// src/components/gencow-provider.tsx
import { GencowProvider } from "@gencow/react";
import { apiClient } from "@/lib/gencow";

export function GencowClientProvider({ children }) {
    return (
        <GencowProvider apiClient={apiClient}>
            {children}
        </GencowProvider>
    );
}
```

### Auth usage

Gencow uses token-based auth with `sessionToken` plus JWT. Do not create custom routes such as `/auth/register`.

Correct client usage:

```tsx
await signUp("user@example.com", "password123", "Ada Lovelace");
await signIn("user@example.com", "password123");
await signOut();

const { token, user, isAuthenticated } = useAuth();
```

Do not do this:

```tsx
fetch("/auth/register", { ... });
fetch("/api/auth/register", { ... });
fetch("/api/users/login", { ... });
localStorage.setItem("token", jwt);
```

Reference auth endpoints:

| Endpoint | Method | Description |
|------------|--------|------|
| `/api/auth/sign-up` | POST | Sign up and return `{ user, sessionToken, token }` |
| `/api/auth/sign-in` | POST | Sign in and return `{ user, sessionToken, token }` |
| `/api/auth/token` | POST | Refresh JWT with `Bearer sessionToken` |
| `/api/auth/sign-out` | POST | Sign out with `Bearer sessionToken` |

The frontend usually does not call those endpoints directly. `createAuthClient(baseUrl)` handles them.

## Data Access - Required Pattern

Use `useQuery` and `useMutation`. Gencow includes WebSocket realtime sync, so hook data updates automatically. Do not call procedures with raw `fetch()` or custom `apiPost()` wrappers.

> When adding cron jobs, crawlers, backfills, bulk imports, or AI-heavy work, define a batch limit and AI fanout budget first. Avoid unbounded `Promise.all`, unlimited crawling, and unlimited LLM calls. Do not expose this work as an `.allowAnonymous()` public mutation; keep it internal to the scheduler or require auth, owner scope, rate limits, and credit limits.

```tsx
import { useQuery, useMutation } from "@gencow/react";
import { api } from "../gencow/api"; // generated

const { data: tasks } = useQuery(api.tasks.list);

const { mutate: create, isPending: isCreating } = useMutation(api.tasks.create);
await create({ title: "New task" });
```

Do not do this:

```tsx
fetch("/api/query", ...);
fetch("/api/mutation", ...);
apiPost("tasks/create", { ... });
```

## Available APIs

### Task CRUD

| Method | Name | Args | Description |
|--------|------|------|------|
| query | `tasks.list` | none | List all tasks, newest first |
| query | `tasks.get` | `{ id: number }` | Get one task |
| mutation | `tasks.create` | `{ title: string, description?: string }` | Create a task |
| mutation | `tasks.update` | `{ id: number, title?, description?, done? }` | Update a task |
| mutation | `tasks.delete` | `{ id: number }` | Delete a task |

### Files

| Method | Name | Args | Description |
|--------|------|------|------|
| query | `files.list` | none | List uploaded files |
| mutation | `files.upload` | `FormData` with `file` | Upload a file |

### Auth

| Function | Description |
|------|------|
| `signUp(email, password, name)` | Sign up |
| `signIn(email, password)` | Sign in |
| `signOut()` | Sign out |
| `useAuth()` | Returns `{ token, user, isAuthenticated }` |

## Data Patterns

```tsx
import { useQuery, useMutation } from "@gencow/react";
import { api } from "../gencow/api";

const { data: tasks } = useQuery(api.tasks.list);

const { mutate: create } = useMutation(api.tasks.create);
await create({ title: "New task" });

const { mutate: update } = useMutation(api.tasks.update);
await update({ id: task.id, done: !task.done });

const { mutate: remove } = useMutation(api.tasks.delete);
await remove({ id: task.id });

const { mutate: upload } = useMutation(api.files.upload);
const formData = new FormData();
formData.append("file", selectedFile);
await upload(formData);
```

## Backend Security Rules

Follow these rules when adding or editing files in `gencow/`.

### Schema

```typescript
import { user } from "./schema-auth";

userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
```

User-owned tables must include a `userId` reference.

### Query

```typescript
const user = ctx.auth.requireAuth();
ctx.db.select().from(tasks).where(eq(tasks.userId, user.id));
```

Do not query user-owned tables without an owner scope.

### Mutation

```typescript
ctx.db.insert(tasks).values({ ...data, userId: user.id });
ctx.db.delete(tasks).where(and(eq(tasks.id, args.id), eq(tasks.userId, user.id)));
```

Do not update or delete by `id` alone.

### Storage

- Default uploads are private. Return fresh `ctx.storage.createReadGrant(storageId, { ttlSeconds: 300, disposition: "inline" })` URLs for private previews.
- Use `ctx.storage.store(file, { visibility: "public" })` and `ctx.storage.getPublicUrl(storageId)` only for intentionally public website assets.
- Store `storageId` in app tables, not short-lived read grant URLs.

## Suggested UI

- Tasks: checklist UI with create, delete, and completion toggle
- Files: upload control plus file list
- Header: sign in, sign out, and account state
