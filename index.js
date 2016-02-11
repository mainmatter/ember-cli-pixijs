/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');

var instrument = require('broccoli-debug').instrument;

module.exports = {
  name: 'ember-cli-pixijs',

  included: function(app) {
    var importPaths = [];

    if (app.env === 'test') {
      importPaths.push(path.join('es5-shim', 'es5-shim.js'));
    }

    if (app.env === 'production') {
      importPaths.push(path.join('pixi.js', 'pixi.min.js'));
    } else {
      importPaths.push(path.join('pixi.js', 'pixi.js'));
      importPaths.push(path.join('pixi.js', 'pixi.js.map'));
    }

    importPaths.push(path.join('pixi-shim.js'));

    for (var importPath of importPaths) {
      app.import(path.join(this.treePaths.vendor, importPath));
    }
  },

  treeForVendor: function(vendorTree) {
    var trees = [];
    
    if (vendorTree) {
      trees.push(vendorTree);
    }
    
    var pixiPath = path.join(path.dirname(require.resolve('pixi.js')), '..', 'bin');
    trees.push(new Funnel(pixiPath, {
      destDir: 'pixi.js',
      include: [new RegExp(/\.(js|map)$/)]
    }));
    
    var es5ShimPath = path.dirname(require.resolve('es5-shim'));
    trees.push(new Funnel(es5ShimPath, {
      destDir: 'es5-shim',
      include: [new RegExp(/\.(js|map)$/)],
      exclude: ['tests/**/*']
    }));
    
    return instrument.print(mergeTrees(trees));
  }
};
