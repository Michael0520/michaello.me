import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  {
    ignores: ['**/postcss.config.js'],
  },
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      '@next/next': nextPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // Disable strict rules for portfolio app
      'react-hooks/set-state-in-effect': 'warn',
      'jsx-a11y/heading-has-content': 'warn',
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
  prettier,
];
