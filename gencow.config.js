/** @type {import('@gencow/core').GencowConfig} */
export default {
    rootDir: "./gencow",
    schema: ["./gencow/schema-auth.ts", "./gencow/schema.ts"],
    codegen: {
        // Optional: where generated frontend codegen artifacts are written.
        // Default: "./src/gencow".
        outDir: "./src/gencow",
        // Optional: db-schema.gen.ts + schema-auth.gen.ts; default is "./gencow/generated".
        // serverOutDir: "./gencow/generated",
        // Set false if you fully own Better Auth schema files.
        authSchema: { emitRelations: true },
    },
    storage: "./.gencow/uploads",
    db: { url: "./.gencow/data" },
    port: 5456,
    // Public frontend origins for API CORS and auth flows.
    // Origins are scheme+host only — no path (a trailing "/kmediwell/" would never match).
    frontendOrigins: [
        "http://localhost:3000",
        "https://late-drum-6529-prod.gencow.app",
        "https://yongkeunyi.github.io",
    ],
    // Legacy escape hatch for advanced local integrations:
    // trustedOrigins: ["http://localhost:*"],
    deploy: {
        app: "late-drum-6529",
    },
};
