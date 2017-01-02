/* jshint expr:true */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration: PixiCanvasComponent', () => {
  setupComponentTest('pixi-canvas', { integration: true });

  it('renders a canvas element', function() {
    this.render(hbs`
      {{pixi-canvas}}
    `);

    let $canvas = this.$('canvas');

    expect($canvas).to.be.ok;
  });

  it('renders a canvas element with the specified size', function() {
    this.render(hbs`
      {{pixi-canvas width=200 height=100}}
    `);

    let $canvas = this.$('canvas');
    let width = Number($canvas.attr('width'));
    let height = Number($canvas.attr('height'));

    expect(width).to.eq(200);
    expect(height).to.eq(100);
  });

  it('replaces the canvas element when the dimensions change', function() {
    this.set('width', 200);
    this.set('height', 100);
    this.render(hbs`
      {{pixi-canvas width=width height=height}}
    `);

    let $oldCanvas = this.$('canvas');

    this.set('width', 100);
    this.set('height', 50);

    let $newCanvas = this.$('canvas');
    let width = Number($newCanvas.attr('width'));
    let height = Number($newCanvas.attr('height'));

    expect($oldCanvas).to.not.eql($newCanvas);
    expect(width).to.eq(100);
    expect(height).to.eq(50);
  });
});
