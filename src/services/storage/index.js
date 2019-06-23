import localforage from 'localforage';

localforage.config();

/**
 * Stores a key value pair in a secure place within the browser.
 * Can only be accessed by the application.
 * @param {String} key
 * @param {String} value
 * @return {Promise<String>} item
 */
export const store = (key, value) => {
  return localforage.setItem(key, value)
};

/**
 * Gets an item from safe storage. Can only be accessed by the application.
 * @return {Promise<String>} item
 */
export const retrieve = (key) => {
  return localforage.getItem(key);
}

/**
 * Removes all traces of the applications storage.
 * @return {Promise<>}
 */
export const deleteStorage = () => {
  return localforage.clear();
}