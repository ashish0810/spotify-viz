import { auth } from './classes/sync';
import Info from './info';
import Example from './example';
import Logger from './logger';

if (window.location.hash === '#start') {
  Logger.info("Started app");
  const example = new Example();
  // const info = new Info();
} else {
  auth();
}