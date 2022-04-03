/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'standard'
  ],
  env: {
    'vue/setup-compiler-macros': true,
    es2021: true,
    node: true,
    browser: false
  },
  ignorePatterns: ['node_modules/**', '**/dist/**']
}
