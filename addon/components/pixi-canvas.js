import Component from '@ember/component';
import { computed } from '@ember/object';
import PIXI from 'pixi';

export default Component.extend({
  draw() {},

  height: computed({
    get() { },
    set(key, value) {
      this.resizePixiRenderer();
      return value;
    }
  }),

  width: computed({
    get() { },
    set(key, value) {
      this.resizePixiRenderer();
      return value;
    }
  }),

  pixiRenderer: computed(function() {
    let { width, height } = this.getProperties('width', 'height');

    return PIXI.autoDetectRenderer(width, height);
  }),


  didReceiveAttrs() {
    let width = this.getAttr('width');
    let height = this.getAttr('height');

    this.setProperties({ width, height });
  },

  willUpdate() {
    let currentCanvas = this.get('_currentCanvas');

    this.$().children(currentCanvas).remove();
  },

  didRender() {
    let renderer = this.get('pixiRenderer');
    let currentCanvas = renderer.view;

    this.set('_currentCanvas', currentCanvas);
    this.$().append(currentCanvas);

    this.draw();
  },

  willDestroyElement() {
    this.get('pixiRenderer').destroy();
  },

  draw() {},

  resizePixiRenderer() {
    let width = this.get('width');
    let height = this.get('height');
    this.get('pixiRenderer').resize(width, height);
  }
});
