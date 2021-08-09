// eslint-env node

module.exports = {
  env: {
    es2021: true,
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'import', 'react', 'prettier'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    // eslint
    'consistent-return': 'off',
    'func-names': 'off',
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'no-plusplus': 'off',
    'no-process-env': 'warn',
    'no-process-exit': 'warn',
    'no-throw-literal': 'off',
    'object-shorthand': ['error', 'consistent-as-needed'],

    // typescript
    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow-as-parameter',
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/member-delimiter-style': 'error',
    '@typescript-eslint/method-signature-style': 'error',
    '@typescript-eslint/no-implicit-any-catch': 'error',
    '@typescript-eslint/no-invalid-void-type': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',

    // import
    'import/exports-last': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          './tests/**/*',
          '**/.*rc.js',
          '**/*.config.*',
          '**/*.test.*',
          '**/*.decorator.*',
          '**/*.fixture.*',
        ],
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
      },
    ],
    'import/prefer-default-export': 'off',

    // react
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-child-element-spacing': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-key': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',

    // react-a11y
    'jsx-a11y/anchor-is-valid': 'off',

    // prettier
    'prettier/prettier': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
  ignorePatterns: ['./node_modules/**/*', './dist/**/*'],
  overrides: [
    {
      files: ['./tests/**/*'],
      env: {
        jest: true,
      },
    },
  ],
};
