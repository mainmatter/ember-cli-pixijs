import Component from '@ember/component';
import { computed } from '@ember/object';
import PIXI from 'pixi';

export default Component.extend({
  draw() {},

  height: computed('height', {
    get() { return 600; },
    set(key, value) {
      this._resizePixiRenderer(this.get('width'), value);
      return value;
    }
  }),

  width: computed('width', {
    get() { return 800; },
    set(key, value) {
      this._resizePixiRenderer(value, this.get('height'));
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

  _resizePixiRenderer(width, height) {
    this.get('pixiRenderer').resize(width, height);
  }
});
