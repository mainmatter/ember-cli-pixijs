module.exports = {
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
  extends: [
    'simplabs/configs/ember-mocha',
    'simplabs/plugins/mocha',
  ],
};
