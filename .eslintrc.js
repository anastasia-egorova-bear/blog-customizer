module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		warnOnUnsupportedTypeScriptVersion: false,
	},
	settings: {
		react: {
			version: 'detect',
		},
		'import/resolver': {
			typescript: {
				project: 'tsconfig.json',
			},
		},
	},
	extends: [
 'airbnb',
 'airbnb/hooks',
 'airbnb-typescript'
 ],
 parserOptions: {
   ecmaVersion: 'latest',
   sourceType: 'module',
   project: './tsconfig.json',
 },
	rules: {
		semi: [2, 'always'],
		quotes: [2, 'single', { avoidEscape: true }],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error'],
		'@typescript-eslint/no-var-requires': 'off',
		'react/prop-types': 'off',
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'react-hooks/exhaustive-deps': 'off',
		'import/no-named-as-default': 'off',
		'@typescript-eslint/no-empty-function': 'off',
	},
};
