/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-cli-pixijs',

  init: function(name) {
    this.treePaths['vendor'] = 'node_modules';
  },

  included: function(app) {
    if (app.env === 'test') {
      app.import('vendor/es5-shim/es5-shim.js');
    }

    app.import('vendor/pixi.js/bin/pixi.js');
  }
};
