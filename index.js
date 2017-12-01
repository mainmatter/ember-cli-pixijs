'use strict';

/* eslint-env node */

let Funnel = require('broccoli-funnel');
let mergeTrees = require('broccoli-merge-trees');
let path = require('path');

module.exports = {
  name: 'ember-cli-pixijs',

  included(app) {
    let vendorPath = this.treePaths.vendor;

    if (app.env === 'test') {
      app.import(path.join(vendorPath, 'es5-shim', 'es5-shim.js'));
    }

    if (app.env === 'production') {
      app.import(path.join(vendorPath, 'pixi.js', 'pixi.min.js'));
    } else {
      app.import(path.join(vendorPath, 'pixi.js', 'pixi.js'));
      app.import(path.join(vendorPath, 'pixi.js', 'pixi.js.map'));
    }

    app.import(path.join(vendorPath, 'pixi-shim.js'));
  },

  treeForVendor(vendorTree) {
    let trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    let pixiPath = path.join(path.dirname(require.resolve('pixi.js')), '..', 'dist');
    trees.push(new Funnel(pixiPath, {
      destDir: 'pixi.js',
      include: [new RegExp(/\.(js|map)$/)]
    }));

    let es5ShimPath = path.dirname(require.resolve('es5-shim'));
    trees.push(new Funnel(es5ShimPath, {
      destDir: 'es5-shim',
      include: [new RegExp(/\.(js|map)$/)],
      exclude: ['tests/**/*']
    }));

    return mergeTrees(trees);
  }
};
