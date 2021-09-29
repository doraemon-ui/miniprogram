module.exports = {
  "root": true,
  "globals": {
    "getApp": false,
    "getCurrentPages": false,
    "Page": false,
    "Component": false,
    "App": false,
    "wx": false,
    "Behavior": false,
  },
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "import",
  ],
  "rules": {
    "indent": [2, 2, { "SwitchCase": 2 }],
    "quotes": [2, "single"],
    "semi": [2, "never"],
    "strict": [2, "never"],
    "comma-dangle": [2, "always-multiline"],
    "array-bracket-newline": [2, "consistent"],
  },
}
