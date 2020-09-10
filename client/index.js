import { auth } from './classes/sync';
import Info from './info';
import Runner from './runner';
import Logger from './logger';
import './style.css';

const VERSION = "0.3.0";
window.Version = VERSION;
window.playerSettings = {};

window.dev = false;

var runner = null;

if (window.location.hash === '#start') {
  Logger.info("Starting app");
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
  const nowPlayingImage = document.getElementById('nowPlayingImage');
  nowPlayingImage.style.display = window.playerSettings.showImage ? "inline-block" : "none";
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

window.bg = {};
window.bg.interval = setInterval(window.changeGif, 15000);
window.bg.isGif = true;
function toggleBackground() {
  if (window.bg.isGif) {
    window.bg.isGif = false;
    clearInterval(window.bg.interval);
  } else {
    window.bg.isGif = true;
    window.bg.interval = setInterval(window.changeGif, 15000);
  }
}

window.bg.toggle = toggleBackground;

document.addEventListener('keydown', (e) => {
  // alert(e.keyCode);
  if (e.keyCode == 68) {
    Logger.debug("Enabled dev features");
    window.dev = true;
  }
  if (e.keyCode == 70) { // key f
    Logger.debug("Toggle fullscreen");
    fullscreen();
  }
  if (e.keyCode == 82 && window.dev) { // key r // DEV MODE REQUIRED
    Logger.debug("Random colors (very buggy)");
    window.playerSettings.randColor = !window.playerSettings.randColor;
  }
  if (e.keyCode == 73) { // key i
    Logger.debug("Toggle image");
    toggleImage();
  }
  if (e.keyCode == 32 && window.dev) { // key SPC // DEV MODE REQUIRED
    Logger.debug("Toggle play");
    window.musicControls.togglePlay();
  }
  if (e.keyCode == 71) { // key g
    Logger.debug("Changing Gif");
    window.changeGif();
  }
  if (e.keyCode == 37 && window.dev) { // key left // DEV MODE REQUIRED
    Logger.debug("Prev song");
    window.musicControls.prev();
  }
  if (e.keyCode == 39 && window.dev) { // key right // DEV MODE REQUIRED
    Logger.debug("Next song");
    window.musicControls.next();
  }
  if (e.keyCode == 66 && window.dev) {
    Logger.debug("Toggle Background");
    window.bg.toggle();
  }
});

if (process.env.NODE_ENV == "development") {
  document.title = "DEV " + document.title;
  window.dev = true;
}

Logger.debug("(End of main thread)");