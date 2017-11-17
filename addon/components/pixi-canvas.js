import Component from '@ember/component';
import { computed } from '@ember/object';
import PIXI from 'pixi';

export default Component.extend({
  draw() {},

  pixiRenderer: computed(function() {
    let { width, height } = this.getProperties('width', 'height');

    return PIXI.autoDetectRenderer(width, height);
  }),

  resizePixiRenderer: Ember.observer('width', 'height', function() {
    let width = this.getAttr('width');
    let height = this.getAttr('height');

    this.get('pixiRenderer').resize(width, height);
  },

  didReceiveAttrs() {
    let width = this.getAttr('width');
    let height = this.getAttr('height');

    this.setProperties({ width, height });
  },

  willDestroyElement() {
    this.get('pixiRenderer').destroy();
  }

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
  }
});
