import { audiolab } from '@swrlab/style-guide/eslint/index'

export default audiolab(
	[
		{
			ignores: ['node_modules/**', 'lib/**', 'target/**', 'test/*.json', 'test/*.xml'],
		},
		{
			languageOptions: {
				globals: {
					Bun: 'readonly',
				},
			},
		},
		{
			rules: {
				// previous config (does not trigger errors)
				// 'import/no-extraneous-dependencies': 0,
				// radix: 0,
				// 'no-param-reassign': [2, { props: false }],
				// 'no-restricted-syntax': 0,
				// 'no-underscore-dangle': 0,
				// 'no-return-assign': ['error', 'except-parens'],
				'one-var': 0,

				// should be fixed / easy to fix
				'prefer-promise-reject-errors': 'off',
				'n/prefer-global/process': 'off',
				'n/prefer-global/buffer': 'off',
				'n/no-process-exit': 'off',
				'n/no-unpublished-import': 'off',
				'n/no-unpublished-require': 'off',
				'eslint-comments/require-description': 'off',
				'vue/multi-word-component-names': 'off',
				'import/no-default-export': 'off',
				'n/no-missing-import': ['error', { allowModules: ['bun', 'Bun'] }],
				'no-console': 'off',
				'import/order': 'off',
				'n/no-unsupported-features/node-builtins': [
					'error',
					{
						version: '>=20.0.0',
						ignores: [],
					},
				],
				'jsonc/no-comments': 'warn',
				'jsonc/sort-keys': 'warn',
			},
		},
	],
	{
		prettier: true,
		comments: true,
		vue: false,
	}
)
