import { registerHooks } from "node:module";
import { defineConfig, globalIgnores } from "eslint/config";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "typescript" || specifier.startsWith("typescript/")) {
      return nextResolve(
        specifier.replace(/^typescript/, "@typescript/typescript6"),
        context,
      );
    }
    return nextResolve(specifier, context);
  },
});

const { default: nextVitals } =
  await import("eslint-config-next/core-web-vitals");
const { default: nextTs } = await import("eslint-config-next/typescript");

const { default: prettier } = await import("eslint-config-prettier/flat");

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      "no-console": "error",
    },
    ignores: ["lib/env.ts"],
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".agents/**",
  ]),
]);

export default eslintConfig;
