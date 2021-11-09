module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  globals: {
    defineProps: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "off",
    "vue/script-setup-uses-vars": "off",
  },
};
