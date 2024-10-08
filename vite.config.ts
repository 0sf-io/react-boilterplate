import react from "@vitejs/plugin-react-swc";
import path from 'node:path';
import {defineConfig} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {configDefaults} from "vitest/config";
// @ts-ignore
import mockServer from "./plugins/mock-server";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({tsDecorators: true}),
        tsconfigPaths(),
        mockServer(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    // @ts-ignore
    test: {
        globals: true,
        environment: "happy-dom",
        setupFiles: "./src/setupTests.ts",
        coverage: {
            provider: "istanbul",
            reportsDirectory: "coverage",
            reporter: [["text", {file: "coverage.txt"}], "json-summary", "html"],
            exclude: [
                ...configDefaults.exclude,
                "plugins/mock-server/*",
                "mocks/*",
            ]
        },
    },
    base: "/",
});
