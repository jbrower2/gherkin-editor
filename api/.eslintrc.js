const path = require('path');

module.exports = {
	extends: 'airbnb-typescript/base',

	parserOptions: {
		// this is needed for the airbnb-typescript config to work
		project: path.resolve(__dirname, 'tsconfig.json'),
	},

	// override some rules from the airbnb configs
	rules: {
		// doesn't work with Prettier
		'@typescript-eslint/indent': 'off',
		'implicit-arrow-linebreak': 'off',
		'function-paren-newline': 'off',
		'no-confusing-arrow': 'off',
		'object-curly-newline': 'off',
		'operator-linebreak': 'off',

		// prevent default exports
		'import/no-default-export': 'error',
		'import/prefer-default-export': 'off',

		// prevent modules with no exports, and exports that are unused
		'import/no-unused-modules': 'error',

		// prevent single-line comments from being on the same line as code
		'line-comment-position': 'error',

		// partially overridden from airbnb
		'max-len': [
			'error',
			{
				code: 120, // overridden
				tabWidth: 2,
				ignoreUrls: true,
				ignoreComments: false,
				ignoreRegExpLiterals: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
			},
		],

		// overridden from airbnb to be an error
		'no-console': 'error',

		// change indent to tabs
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		'no-tabs': ['error', { allowIndentationTabs: true }],

		// overridden from airbnb to match Prettier setting
		'quote-props': ['error', 'consistent-as-needed', { keywords: false }],
	},
};
