module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.eslint.json']
    },
    plugins: ['@typescript-eslint'],
    
    // prettier-ignore
    extends: [
        'plugin:@typescript-eslint/strict',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    rules: {
        'getter-return': 'error',
        '@typescript-eslint/class-literal-property-style': 'off',

        // Most of the constructor calls super so it is not useless
        '@typescript-eslint/no-useless-constructor': 'off',

        // We're working on DOM elements
        '@typescript-eslint/no-non-null-assertion': 'off',
        
        '@typescript-eslint/no-unnecessary-condition': 'off'
    }
};
