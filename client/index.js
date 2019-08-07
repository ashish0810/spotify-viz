import { auth } from './classes/sync';
import Info from './info';
import Example from './example';

if (window.location.hash === '#start') {
  // const info = new Info();
  const example = new Example();
} else {
  auth();
}