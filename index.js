/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-pixijs',

  init: function(name) {
    var assetsPath = require('path').join('src', 'index.js');
    this.treePaths['vendor'] = require.resolve('pixi.js').replace(assetsPath, '');
  },

  included: function(app) {
    this.app.import('vendor/bin/pixi.js');
  }
};
