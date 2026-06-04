module.exports = {
  extends: [
    "stylelint-config-recommended",
    "stylelint-config-recommended-vue",
    "stylelint-config-html/vue",
    "stylelint-config-recess-order",
  ],

  plugins: ["stylelint-prettier"],

  overrides: [
    {
      files: ["**/*.{vue,html}"],
      customSyntax: "postcss-html",
    },
  ],

  rules: {
    "prettier/prettier": true,
    "no-empty-source": null,
    "declaration-property-value-no-unknown": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global", "export", "deep"],
      },
    ],
    "no-invalid-position-declaration": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "layer",
          "theme",
          "variant",
          "custom-variant",
          "import",
        ],
      },
    ],
    "import-notation": null,
    "selector-class-pattern": null,
    "custom-media-pattern": null,
  },
};
