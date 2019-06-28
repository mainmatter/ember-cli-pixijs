import Component from '@ember/component';
import { computed } from '@ember/object';
import PIXI from 'pixi';

export default Component.extend({
  draw() {},

  height: computed('height', {
    get() { },
    set(key, value) {
      this._resizePixiRenderer(this.get('width'), value);
      return value;
    }
  }),

  width: computed('width', {
    get() { },
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
    let canvas = renderer.view;

    this.element.appendChild(canvas);
    this.draw();
  },

  willDestroyElement() {
    this.get('pixiRenderer').destroy();
  },

  _resizePixiRenderer(width, height) {
    this.get('pixiRenderer').resize(width, height);
  }
});
