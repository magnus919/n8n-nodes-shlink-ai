module.exports = {
  root: true,
  env: {
    browser: false,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  plugins: [
    '@typescript-eslint',
    'n8n-nodes-base',
  ],
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:n8n-nodes-base/nodes',
  ],
  rules: {
    // n8n specific rules
    'n8n-nodes-base/node-class-description-credentials-name-unsuffixed': 'error',
    'n8n-nodes-base/node-class-description-display-name-unsuffixed-trigger-node': 'error',
    'n8n-nodes-base/node-class-description-name-unsuffixed-trigger-node': 'error',
    'n8n-nodes-base/node-dirname-against-convention': 'error',
    'n8n-nodes-base/node-filename-against-convention': 'error',
    'n8n-nodes-base/node-class-description-missing-subtitle': 'error',
    'n8n-nodes-base/cred-class-field-documentation-url-missing': 'error',
    'n8n-nodes-base/cred-class-field-display-name-missing': 'error',
    'n8n-nodes-base/cred-class-field-name-missing': 'error',
    'n8n-nodes-base/cred-class-field-type-options-password-missing': 'error',
    'n8n-nodes-base/cred-class-name-missing': 'error',
    'n8n-nodes-base/cred-filename-against-convention': 'error',

    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/prefer-const': 'error',
    '@typescript-eslint/no-var-requires': 'error',

    // General ESLint rules
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'quote-props': ['error', 'as-needed'],
    'no-array-constructor': 'error',
    'prefer-destructuring': ['error', {
      'array': false,
      'object': true
    }],
    'prefer-template': 'error',
    'template-curly-spacing': 'error',
    'prefer-promise-reject-errors': 'error',
    'no-new-wrappers': 'error',
    'prefer-rest-params': 'error',
    'default-param-last': 'error',
    'prefer-spread': 'error',
    'prefer-arrow-callback': 'error',
    'arrow-spacing': 'error',
    'no-duplicate-imports': 'error',
    'no-useless-rename': 'error',
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'semi': ['error', 'always'],
  },
  ignorePatterns: ['dist/**', 'node_modules/**', '*.js'],
};