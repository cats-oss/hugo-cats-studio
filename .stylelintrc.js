module.exports = {
  plugins: ['stylelint-prettier'],
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  rules: {
    'no-descending-specificity': null,
  },
};
