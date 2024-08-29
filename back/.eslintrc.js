module.exports = {
    env: {
      node: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:prettier/recommended',
      'prettier',
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn', 
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], 
    },
  };
  