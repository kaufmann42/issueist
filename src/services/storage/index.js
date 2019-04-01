/**
 * Stores a key value pair in a secure place within the browser.
 * Can only be accessed by the application.
 * @param {String} key 
 * @param {String} value 
 */
export const store = (key, value) => {
  window.localStorage.setItem(key, value);
};
