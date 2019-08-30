import { auth } from './classes/sync';
import Info from './info';
import Runner from './runner';
import Logger from './logger';
import './style.css';

const VERSION = "0.1.5";
window.Version = VERSION;
window.playerSettings = {};

var runner = null;

if (window.location.hash === '#start') {
  Logger.info("Started app");
  Logger.info("Version: " + VERSION);
  runner = new Runner();
  // runner = new Info();
} else {
  auth();
}

window.playerSettings.randColor = false;
window.playerSettings.showImage = false;

function toggleImage() {
  window.playerSettings.showImage = !window.playerSettings.showImage;
  window.updateNowPlaying();
}
window.toggleImage = toggleImage;

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
  // alert(e.keyCode);
  if (e.keyCode == 70) {
    fullscreen();
  }
  if (e.keyCode == 82) {
    window.playerSettings.randColor = !window.playerSettings.randColor;
  }
  if (e.keyCode == 73) {
    toggleImage();
  }
});
