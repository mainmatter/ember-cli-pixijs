import Ember from 'ember';
import PIXI from 'pixi';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  didReceiveAttrs() {
    const width = this.getAttr('width');
    const height = this.getAttr('height');

    this.setProperties({ width, height });
  },

  pixiRenderer: computed('width', 'height', function() {
    const { width, height } = this.getProperties('width', 'height');

    return new PIXI.autoDetectRenderer(width, height);
  }),

  willUpdate() {
    const currentCanvas = this.get('_currentCanvas');

    this.$().children(currentCanvas).remove();
  },

  didRender() {
    const renderer = this.get('pixiRenderer');
    const currentCanvas = renderer.view;

    this.set('_currentCanvas', currentCanvas);
    this.$().append(currentCanvas);

    this.draw();
  },

  draw() {}
});
