import Ember from 'ember';
import PIXI from 'pixi';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  pixiRenderer: computed('width', 'height', function() {
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

  draw() {}
});
