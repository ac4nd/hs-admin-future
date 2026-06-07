import eslint from "@eslint/js";
import globals from "globals";
import * as typescriptEslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import configPrettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
// 解析自动导入配置
import fs from "node:fs";
let autoImportGlobals = {};
try {
    autoImportGlobals =
        JSON.parse(fs.readFileSync("./.eslintrc-auto-import.json", "utf-8")).globals || {};
}
catch {
    // 文件不存在时使用空对象
}
export default [
    // 忽略文件配置
    {
        ignores: [
            "**/node_modules/**",
            "**/dist/**",
            "**/*.min.*",
            "**/auto-imports.d.ts",
            "**/components.d.ts",
            "types/**/*.d.ts",
        ],
    },
    // 基础 JavaScript 配置
    eslint.configs.recommended,
    // Vue 推荐配置
    ...pluginVue.configs["flat/recommended"],
    // TypeScript 推荐配置
    ...typescriptEslint.configs.recommended,
    // 全局配置
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2022,
                ...autoImportGlobals,
            },
        },
        plugins: {
            vue: pluginVue,
            "@typescript-eslint": typescriptEslint.plugin,
        },
        rules: {
            // 基础规则
            "no-console": ["error", { allow: ["warn", "error", "debug"] }],
            "no-debugger": "error",
            // ES6+ 规则
            "prefer-const": "error",
            "no-var": "error",
            "object-shorthand": "error",
            // 最佳实践
            eqeqeq: ["error", "always", { null: "ignore" }],
            "no-multi-spaces": "error",
            "no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 0 }],
            // 禁用与 TypeScript 冲突的规则
            "no-unused-vars": "off",
            "no-undef": "off",
            "no-redeclare": "off",
            "@typescript-eslint/ban-ts-comment": "off",
        },
    },
    // Vue 文件特定配置
    {
        files: ["**/*.vue"],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                parser: typescriptEslint.parser,
                extraFileExtensions: [".vue"],
                tsconfigRootDir: __dirname,
            },
        },
        rules: {
            "vue/multi-word-component-names": "off",
            "vue/no-v-html": "off",
            "vue/require-default-prop": "off",
            "vue/require-explicit-emits": "error",
            "vue/no-unused-vars": "error",
            "vue/no-mutating-props": "off",
            "vue/valid-v-for": "warn",
            "vue/no-template-shadow": "warn",
            "vue/return-in-computed-property": "warn",
            "vue/block-order": ["error", { order: ["template", "script", "style"] }],
            "vue/html-self-closing": [
                "error",
                {
                    html: { void: "always", normal: "never", component: "always" },
                    svg: "always",
                    math: "always",
                },
            ],
            "vue/component-name-in-template-casing": ["error", "PascalCase"],
            "@typescript-eslint/no-explicit-any": "warn",
        },
    },
    // TypeScript 文件特定配置
    {
        files: ["**/*.{ts,tsx,mts,cts}"],
        languageOptions: {
            parser: typescriptEslint.parser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                tsconfigRootDir: __dirname,
            },
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/no-unused-expressions": "warn",
            "@typescript-eslint/consistent-type-imports": "off",
        },
    },
    // .d.ts 文件配置
    {
        files: ["**/*.d.ts"],
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off",
        },
    },
    // Prettier 集成（必须放在最后）
    {
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            ...configPrettier.rules,
            "prettier/prettier": ["error", {}, { usePrettierrc: true }],
            "arrow-body-style": "off",
            "prefer-arrow-callback": "off",
        },
    },
];
//# sourceMappingURL=eslint.config.js.map