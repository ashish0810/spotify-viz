import Logger from "../logger";

/**
 * @function getRandomElement – Retrieve random element from array.
 */
export function getRandomElement (arr, showIndex = false) {
  const index = Math.floor(Math.random() * arr.length)
  if (showIndex) {
    Logger.debug(index);
  }
  return arr[index]
}