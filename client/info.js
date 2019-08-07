import Visualizer from './classes/visualizer'
import { interpolateRgb, interpolateBasis } from 'd3-interpolate'
import { getRandomElement } from './util/array'
import { sin, circle } from './util/canvas'

export default class Info extends Visualizer {
  constructor () {
    super({ volumeSmoothing: 10 })
    this.theme = ['#18FF2A', '#7718FF', '#06C5FE', '#FF4242', '#18FF2A']
    this.rotationAngle = 0
  }

  hooks () {
    // this.sync.on('tatum', tatum => {

    // })

    // this.sync.on('segment', segment => {

    // })

    // this.sync.on('beat', beat => {

    // })

    this.sync.on('bar', bar => {
      this.lastColor = this.nextColor || getRandomElement(this.theme)
      this.nextColor = getRandomElement(this.theme.filter(color => color !== this.nextColor))
    })

    // this.sync.on('section', section => {

    // })
  }

  doOnce({ cts, height, width }) {

  }

  paint ({ ctx, height, width, now }) {
    ctx.fillStyle = 'rgba(0, 0, 0, .08)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = interpolateRgb(this.lastColor, this.nextColor)(this.sync.bar.progress)

    // this.sync.volume 10
    ctx.fillStyle = 'red';
    ctx.fillRect(0, ((this.sync.volume/2)*height), (width/10), height);
    ctx.stroke();

    // this.sync.tatum 18
    ctx.fillStyle = 'green';
    ctx.fillRect(0.10*width, height - ((this.sync.tatum.progress)*height), 0.28*width, height);
    ctx.stroke();
    
    // this.sync.segment 18
    ctx.fillStyle = 'blue';
    ctx.fillRect(0.28*width, height - ((this.sync.segment.progress)*height), 0.46*width, height);
    ctx.stroke();

    // this.sync.beat 18
    ctx.fillStyle = 'yellow';
    ctx.fillRect(0.46*width, height - ((this.sync.beat.progress)*height), 0.64*width, height);
    ctx.stroke();
    
    // this.sync.bar 18
    ctx.fillStyle = 'purple';
    ctx.fillRect(0.64*width, height - ((this.sync.bar.progress)*height), 0.82*width, height);
    ctx.stroke();

    // this.sync.section 18
    ctx.fillStyle = 'red';
    ctx.fillRect(0.82*width, height - ((this.sync.section.progress)*height), width, height);
    ctx.fill();
  }
}