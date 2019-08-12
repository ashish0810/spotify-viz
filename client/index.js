import { auth } from './classes/sync';
import Info from './info';
import Example from './example';
import Logger from './logger';

const VERSION = "0.1.1";
var runner = null;

if (window.location.hash === '#start') {
  Logger.info("Started app");
  Logger.info("Version: " + VERSION);
  runner = new Example();
  // const info = new Info();
} else {
  auth();
}

Logger.debug("Reached here");

function pause() {
  runner.pause();
}
window.pause = pause;

function play() {
  runner.play();
}
window.play = play;

window.Version = VERSION;
