const {
  fixupConfigRules,
} = require('@eslint/compat');

const reactRefresh = require('eslint-plugin-react-refresh');
const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const js = require('@eslint/js');

const {
  FlatCompat,
} = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.recommended,
});

module.exports = [
  {
    ignores: [
      '**/src/components/ui/*',
      '**/node_modules/*'
    ],
  },
  ...fixupConfigRules(compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  )),
  {
    plugins: {
      'react-refresh': reactRefresh,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      'react-refresh/only-export-components': 'warn',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
];
