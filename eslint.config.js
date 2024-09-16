import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import neostandard, { resolveIgnoresFromGitignore } from 'neostandard'

export default tseslint.config(
  { ignores: ['dist'] },
  ...neostandard({
    ignores: resolveIgnoresFromGitignore()
  }),
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@stylistic/max-len': [
        'warn',
        {
          code: 80,
          tabWidth: 2,
          ignoreUrls: true,
          ignoreComments: false
        }
      ],
      '@stylistic/space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          asyncArrow: 'always',
          named: 'never'
        }
      ],
      '@stylistic/jsx-quotes': ['error', 'prefer-double']
    }
  }
)
