import { auth } from './classes/sync';
import Info from './info';
import Runner from './runner';
import Logger from './logger';
import './style.css';

const VERSION = "0.1.6";
window.Version = VERSION;
window.playerSettings = {};

window.dev = false;

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
  if (e.keyCode == 68) {
    window.dev = true;
  }
  if (e.keyCode == 70) { // key f
    fullscreen();
  }
  if (e.keyCode == 82 && window.dev) { // key r
    window.playerSettings.randColor = !window.playerSettings.randColor;
  }
  if (e.keyCode == 73) { // key i
    toggleImage();
  }
  if (e.keyCode == 32 && window.dev) { // key SPC
    window.musicControls.togglePlay();
  }
});

if (process.env.NODE_ENV == "development") {
  document.title = "DEV " + document.title;
  // window.dev = true;
}

Logger.debug("(End of main thread)");