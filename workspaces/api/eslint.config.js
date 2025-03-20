import ESLintJS from "@eslint/js";
import TypeScriptESLint from "typescript-eslint";
import Globals from "globals";
export default TypeScriptESLint.config([
    ESLintJS.configs.recommended,
    TypeScriptESLint.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...Globals.node,
            },
        },
    },
    {
        ignores: ["dist/"],
    },
]);
