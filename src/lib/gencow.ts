import { createAuthClient, createGencowClient } from "@gencow/client";
import { api } from "../gencow/api";

export const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:5456";
export const auth = createAuthClient(baseUrl);
export const apiClient = createGencowClient({ api, baseUrl, auth });
export const { signIn, signUp, signOut } = auth;
export { api };
export { useAuth } from "@gencow/react";
