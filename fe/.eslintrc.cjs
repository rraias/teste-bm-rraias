module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'consistent-return': 'off',
    'react/jsx-no-bind': 'off',
    'no-shadow': 'off',
    'no-restricted-globals': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
