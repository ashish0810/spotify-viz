import Visualizer from './classes/visualizer'
import { interpolateRgb, interpolateBasis } from 'd3-interpolate'
import { getRandomElement } from './util/array'
import { sin, circle } from './util/canvas'
import Logger from './logger';

export default class Runner extends Visualizer {
  constructor () {
    super({ volumeSmoothing: 10 });
    this.themeSets = [
      ['#FFCCBB', '#6Eb5C0', '#006C84', '#E2E8E4']
      ['#C5001A', '#E4E3DB', '#113743', '#C5BEBA'],
      ['#011A27', '#063852', '#F0810F', '#E6DF44'],
      ['#04202C', '#304040', '#5B7065', '#C9D1C8'],
    ];
    this.theme = ['#18FF2A', '#7718FF', '#06C5FE', '#FF4242', '#18FF2A'];
    this.rotationAngle = 0;
    this.themeIdx = 0;
  }

  hooks () {
    this.sync.on('bar', bar => {
      if (!window.playerSettings.randColor) {
        this.lastColor = this.nextColor || getRandomElement(this.theme);
        this.nextColor = getRandomElement(this.theme.filter(color => color !== this.nextColor));
      }
    });

    this.sync.on('section', section => {
      if (window.playerSettings.randColor) {
        Logger.debug("*** New section ***");
        this.theme = getRandomElement(this.themeSets, true);
        // this.themeIdx = Math.floor(Math.random() * this.themeSets.length);
        // this.theme = this.themeSets[this.themeIdx];
      }
    });
  }
  
  doOnce ({ ctx, height, width }) {
    // console.log('doing it');
    // ctx.translate(this.width/2, this.height/2);
    // // ctx.stroke();
    // console.log('should be done');
  }

  paint ({ ctx, height, width, now, progress, duration, elapsed, start }) {
    // Logger.debug("Painting...");
    window.state = this.sync.state;
    window.ctx = ctx;
    // Logger.debug("Active: " + window.state.active);
    if (window.playerSettings.randColor) {
      this.lastColor = this.nextColor || getRandomElement(this.theme);
      this.nextColor = getRandomElement(this.theme);
    }
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
    // ctx.fillStyle = 'rgba(0, 0, 0, .08)';
    // ctx.fillRect(-width/2, -height/2, width, height);
    ctx.clearRect(-width/2, -height/2, width, height);
    // ctx.clear(true);

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
    circle(ctx, 0, 0, this.sync.volume * height / 10 + beat / 10);
    ctx.stroke();
    // Logger.debug("Progress: " + progressNorm);
    // Logger.debug("Duration: " + duration);
    // Logger.debug("Elapsed: " + elapsed);
    ctx.fill();
  }
}