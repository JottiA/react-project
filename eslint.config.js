import process from 'node:process';
import { fileURLToPath } from 'node:url';
import globalDefs from 'globals'
import { defineConfig } from 'eslint/config'
import { includeIgnoreFile } from '@eslint/compat';
import eslintPlugin from '@eslint/js';
import tslintPlugin from 'typescript-eslint';
import reactPlugin from '@eslint-react/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactEffectPlugin from 'eslint-plugin-react-you-might-not-need-an-effect';
import importPlugin from 'eslint-plugin-import-lite';
import promisePlugin from 'eslint-plugin-promise';
import regexpPlugin from 'eslint-plugin-regexp';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import unicornPlugin from 'eslint-plugin-unicorn';
import jsonPlugin from 'eslint-plugin-jsonc';
import formatPlugin from 'eslint-plugin-format';

export default defineConfig([
  includeIgnoreFile(fileURLToPath(new URL('.gitignore', import.meta.url))),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      eslintPlugin.configs['recommended'],
      tslintPlugin.configs['recommendedTypeChecked'],
      sonarjsPlugin.configs['recommended'],
      unicornPlugin.configs['recommended'],
      importPlugin.configs['recommended'],
      promisePlugin.configs['flat/recommended'],
      regexpPlugin.configs['flat/recommended'],
      reactPlugin.configs['recommended-type-checked'],
      reactEffectPlugin.configs['recommended'],
      reactHooksPlugin.configs['recommended-latest'],
    ],
    plugins: {
      format: formatPlugin,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
      ecmaVersion: 2020,
      globals: {
        ...globalDefs.browser,
        ...globalDefs.es2021,
        ...globalDefs.node,
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly'
      },
    },
    rules: {
      // Eslint
      'no-console': 'warn',
      'no-constant-binary-expression': 'warn',
      'no-prototype-builtins': 'warn',
      'no-unsafe-optional-chaining': 'warn',
      'prefer-regex-literals': 'warn',

      // Typescript
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_$',
          argsIgnorePattern: '^_$'
        }
      ],
      '@typescript-eslint/no-misused-promises': [
        'warn',
        {
          checksVoidReturn: {
            arguments: true,
            attributes: false,
            inheritedMethods: true,
            properties: true,
            returns: true,
            variables: true
          }
        }
      ],
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/only-throw-error': 'off',
      '@typescript-eslint/no-floating-promises': 'off',

      // Unicorn
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-nested-ternary': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/prefer-switch': 'off',
      'unicorn/prefer-logical-operator-over-ternary': 'off',
      'unicorn/no-unnecessary-polyfills': 'off',
      'unicorn/consistent-function-scoping': 'off',

      // SonarJS
      'sonarjs/cognitive-complexity': 'off',
      'sonarjs/todo-tag': 'off',
      'sonarjs/no-nested-conditional': 'off',
      'sonarjs/no-unused-vars': 'off',
      'sonarjs/arguments-order': 'off',
      'sonarjs/no-async-constructor': 'off',
      'sonarjs/no-dead-store': 'off',
      'sonarjs/pseudo-random': 'off',
      'sonarjs/no-commented-code': 'off',
      'sonarjs/deprecation': 'off',
      'sonarjs/no-redundant-assignments': 'off',
      'sonarjs/aws-restricted-ip-admin-access': 'off',
      'sonarjs/different-types-comparison': 'off',
      'sonarjs/void-use': 'off',

      // Prettier
      'format/prettier': [
        'warn',
        {
          printWidth: 120,
          singleQuote: true,
          trailingComma: 'none',
          tabWidth: 2
        }
      ],

      // React
      '@eslint-react/no-array-index-key': 'off',
      '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 'off',
      '@eslint-react/dom/no-dangerously-set-innerhtml': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/use-memo': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-you-might-not-need-an-effect/no-initialize-state': 'off',
    }
  },
  {
    // JSON
    files: ['**.json', 'package.json', 'tsconfig.json'],
    extends: [jsonPlugin.configs['flat/recommended-with-jsonc']],
    rules: {
      'jsonc/indent': ['warn', 2],
      'jsonc/quote-props': ['warn', 'always'],
      'jsonc/no-dupe-keys': 'warn',
      'jsonc/array-bracket-spacing': ['warn', 'never'],
      'jsonc/object-curly-spacing': ['warn', 'always']
    }
  },
])
