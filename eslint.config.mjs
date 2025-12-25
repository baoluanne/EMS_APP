import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier';
import tseslint from '@electron-toolkit/eslint-config-ts';
import eslintPluginReact from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  { ignores: ['**/node_modules', '**/dist', '**/out'] },
  tseslint.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-compiler': reactCompiler,
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh,
    },
    rules: {
      'react-compiler/react-compiler': 'error',
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReactRefresh.configs.vite.rules,
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          printWidth: 100,
          trailingComma: 'all',
          tabWidth: 2,
          endOfLine: 'auto',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'react/prop-types': 'off',
      'linebreak-style': 'off',
    },
  },
  eslintConfigPrettier,
);
