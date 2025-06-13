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
    'plugin:@typescript-eslint/recommended',
    'plugin:n8n-nodes-base/nodes',
  ],
  rules: {
    // Remove the broken n8n rules temporarily
    // 'n8n-nodes-base/cred-class-field-display-name-missing': 'error',
    // 'n8n-nodes-base/cred-class-field-name-missing': 'error', 
    // 'n8n-nodes-base/cred-class-name-missing': 'error',

    // Keep working n8n rules
    'n8n-nodes-base/node-class-description-credentials-name-unsuffixed': 'error',
    'n8n-nodes-base/node-class-description-display-name-unsuffixed-trigger-node': 'error',
    'n8n-nodes-base/node-class-description-name-unsuffixed-trigger-node': 'error',
    'n8n-nodes-base/node-dirname-against-convention': 'error',
    'n8n-nodes-base/node-filename-against-convention': 'error',

    // TypeScript rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    // Remove the broken @typescript-eslint/prefer-const rule
    // '@typescript-eslint/prefer-const': 'error',

    // General rules
    'prefer-const': 'error',
    'quote-props': ['error', 'as-needed'],
  },
  ignorePatterns: ['dist/**', 'node_modules/**', '*.js'],
};