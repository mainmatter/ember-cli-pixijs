[![Build Status](https://travis-ci.org/simplabs/ember-cli-pixijs.svg?branch=master)](https://travis-ci.org/simplabs/ember-cli-pixijs)

# ember-cli-pixijs

ember-cli-pixijs wraps the [pixi.js](https://github.com/pixijs/pixi.js) HTML5
2D rendering engine so that it can easily be used in Ember.js applications.

It also defines a `PixiCanvas` component that can be used to display canvases
rendered with pixi.js in Ember.js applications. The component handles creating
a pixi.js renderer, inserting the canvas into the DOM and replacing it when the
dimensions change. Whenever the canvas is (re-)rendered, the component's `draw`
method is called that handles the actual drawing with pixi.js.

A concrete subclass of the `PixiCanvas` component might look sth. like this:

```js
// app/components/my-pixi-component.js
/* global PIXI */
import PixiCanvas from 'ember-cli-pixijs/components/pixi-canvas';

export default PixiCanvas.extend({
  draw() {
    const renderer = this.get('pixiRenderer');
    const stage = new PIXI.Container();

    const graphics = new PIXI.Graphics();

    // set a fill and line style
    graphics.beginFill(0xFF3300);
    graphics.lineStyle(10, 0xffd900, 1);

    // draw a shape
    graphics.moveTo(50, 50);
    graphics.lineTo(250, 50);
    graphics.lineTo(100, 100);
    graphics.lineTo(250, 220);
    graphics.lineTo(50, 220);
    graphics.lineTo(50, 50);
    graphics.endFill();

    stage.addChild(graphics);
  }
});
```

## Installation

Installing the addon is as easy as:

```bash
ember install ember-cli-pixijs
```

## License

ember-cli-pixijs is developed by and &copy;
[simplabs GmbH/Marco Otte-Witte](http://simplabs.com) and contributors. It is
released under the
[MIT License](https://github.com/simplabs/ember-simple-auth/blob/master/LICENSE).

ember-cli-pixijs is not an official part of [Ember.js](http://emberjs.com) and
is not maintained by the Ember.js Core Team.
