import { auth } from './classes/sync';
import Info from './info';
import Runner from './runner';
import Logger from './logger';
import './style.css';

const VERSION = "0.1.3.a";
var runner = null;

if (window.location.hash === '#start') {
  Logger.info("Started app");
  Logger.info("Version: " + VERSION);
  runner = new Runner();
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

function fullscreen() {
  const elem = document.documentElement;
  if(window.innerWidth == screen.width && window.innerHeight == screen.height) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  } else {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }
}
window.toggleFull = fullscreen;

document.addEventListener('keydown', (e) => {
  if (e.keyCode == 70) {
    fullscreen();
  }
});

window.Version = VERSION;
