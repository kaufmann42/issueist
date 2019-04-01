/**
 * Stores a key value pair in a secure place within the browser.
 * Can only be accessed by the application.
 * @param {String} key 
 * @param {String} value 
 */
export const store = (key, value) => {
  window.localStorage.setItem(key, value);
};

/**
 * Gets an item from safe storage. Can only be accessed by the application.
 * @return {String} item
 */
export const retrieve = (key) => {
  return window.localStorage.getItem(key);
}

/**
 * Removes all traces of the applications storage.
 */
export const deleteStorage = () => {
  window.localStorage.clear();
}