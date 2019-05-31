import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

describe('Integration: PixiCanvasComponent', function() {
  setupRenderingTest();

  it('renders a canvas element', async function() {
    await render(hbs`
      {{pixi-canvas}}
    `);

    let canvas = this.element.querySelector('canvas');

    expect(canvas).to.be.ok;
  });

  it('renders a canvas element with the specified size', async function() {
    await render(hbs`
      {{pixi-canvas width=200 height=100}}
    `);

    let canvas = this.element.querySelector('canvas');

    let width = Number(canvas.width);
    let height = Number(canvas.height);

    expect(width).to.eq(200);
    expect(height).to.eq(100);
  });

  it('resizes the canvas element when the dimensions change', async function() {
    this.set('width', 200);
    this.set('height', 100);
    await render(hbs`
      {{pixi-canvas width=width height=height}}
    `);

    let oldCanvas = this.element.querySelector('canvas');

    this.setProperties({
      width: 100,
      height: 50
    });

    let newCanvas = this.element.querySelector('canvas');
    let width = Number(newCanvas.width);
    let height = Number(newCanvas.height);

    expect(oldCanvas).to.eql(newCanvas);
    expect(width).to.eq(100);
    expect(height).to.eq(50);
  });
});
