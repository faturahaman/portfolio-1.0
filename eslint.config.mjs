import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next, but matched at any depth. The
    // root-anchored ".next/**" missed build output inside git worktrees under
    // .claude/worktrees/, so `npm run lint` was reporting ~10k problems from
    // generated bundles and drowning the handful of real ones.
    "**/.next/**",
    "**/out/**",
    "**/build/**",
    "**/node_modules/**",
    "**/next-env.d.ts",
    // Agent scratch worktrees — separate checkouts of this same repo, which
    // get linted on their own terms, not from here.
    ".claude/**",
  ]),
]);

export default eslintConfig;
