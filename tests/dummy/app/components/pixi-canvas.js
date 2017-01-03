/* global requestAnimationFrame */
import PIXI from 'pixi';
import PixiCanvas from 'ember-cli-pixijs/components/pixi-canvas';

const { cos, sin } = Math;

export default PixiCanvas.extend({
  draw() {
    let renderer = this.get('pixiRenderer');
    let stage = new PIXI.Container();
    stage.interactive = true;

    let graphics = new PIXI.Graphics();

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

    // set a fill and line style again
    graphics.lineStyle(10, 0xFF0000, 0.8);
    graphics.beginFill(0xFF700B, 1);

    // draw a second shape
    graphics.moveTo(210, 300);
    graphics.lineTo(450, 320);
    graphics.lineTo(570, 350);
    graphics.quadraticCurveTo(600, 0, 480, 100);
    graphics.lineTo(330, 120);
    graphics.lineTo(410, 200);
    graphics.lineTo(210, 300);
    graphics.endFill();

    // draw a rectangle
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.drawRect(50, 250, 100, 100);

    // draw a circle
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF0B, 0.5);
    graphics.drawCircle(470, 200, 100);
    graphics.endFill();

    graphics.lineStyle(20, 0x33FF00);
    graphics.moveTo(30, 30);
    graphics.lineTo(600, 300);

    stage.addChild(graphics);

    // let's create a moving shape
    let thing = new PIXI.Graphics();
    stage.addChild(thing);
    thing.position.x = 620 / 2;
    thing.position.y = 380 / 2;

    let count = 0;

    animate();

    function animate() {
      thing.clear();

      count += 0.1;

      thing.clear();
      thing.lineStyle(10, 0xff0000, 1);
      thing.beginFill(0xffFF00, 0.5);

      thing.moveTo(-120 + sin(count) * 20, -100 + cos(count) * 20);
      thing.lineTo(120 + cos(count) * 20, -100 + sin(count) * 20);
      thing.lineTo(120 + sin(count) * 20, 100 + cos(count) * 20);
      thing.lineTo(-120 + cos(count) * 20, 100 + sin(count) * 20);
      thing.lineTo(-120 + sin(count) * 20, -100 + cos(count) * 20);

      thing.rotation = count * 0.1;
      renderer.render(stage);
      requestAnimationFrame(animate);
    }
  }
});
