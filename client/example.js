import Visualizer from './classes/visualizer'
import { interpolateRgb, interpolateBasis } from 'd3-interpolate'
import { getRandomElement } from './util/array'
import { sin, circle } from './util/canvas'
import Logger from './logger';

export default class Example extends Visualizer {
  constructor () {
    super({ volumeSmoothing: 10 })
    this.theme = ['#18FF2A', '#7718FF', '#06C5FE', '#FF4242', '#18FF2A']
    this.rotationAngle = 0
  }

  hooks () {
    this.sync.on('bar', beat => {
      this.lastColor = this.nextColor || getRandomElement(this.theme)
      this.nextColor = getRandomElement(this.theme.filter(color => color !== this.nextColor))
    })
  }
  
  doOnce ({ ctx, height, width }) {
    // console.log('doing it');
    // ctx.translate(this.width/2, this.height/2);
    // // ctx.stroke();
    // console.log('should be done');
  }

  paint ({ ctx, height, width, now, progress, duration, elapsed, start }) {
    Logger.debug("Painting...");
    // Logger.debug("Progress: " + this.sync.state.trackProgress);
    // Logger.debug("Duration: " + this.sync.state.trackDuration);
    // Sets up vars
    this.rotationAngle = 0.5+this.rotationAngle;
    if (this.rotationAngle > 360) {
      this.rotationAngle = this.rotationAngle - 360;
    } 
    const bar = interpolateBasis([0, this.sync.volume * 10, 0])(this.sync.bar.progress);
    const beat = interpolateBasis([0, this.sync.volume * 300, 0])(this.sync.beat.progress);
    const progressNorm = this.sync.state.trackProgress / this.sync.state.trackDuration;
    const color = interpolateRgb(this.lastColor, this.nextColor)(this.sync.bar.progress);

    // Clear
    ctx.fillStyle = 'rgba(0, 0, 0, .08)';
    ctx.fillRect(-width/2, -height/2, width, height);

    // Draw
    ctx.lineWidth = bar;
    ctx.strokeStyle = color;
    sin(ctx, (now / 50), 0, this.sync.volume * 50, 100, 5, this.rotationAngle);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fillRect(-(width/2), (height/2)-10, progressNorm*width, 20);
    // ctx.fill();
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.beginPath();
    ctx.lineWidth = beat;
    circle(ctx, 0, 0, this.sync.volume * height / 5 + beat / 10);
    ctx.stroke();
    Logger.debug("Progress: " + progressNorm);
    // Logger.debug("Duration: " + duration);
    // Logger.debug("Elapsed: " + elapsed);
    ctx.fill();
  }
}