export default {
  debug: (msg, ...args) => console.debug(msg, args),
  info: (msg, ...args) => console.log(msg, args),
  error: (msg, ...args) => console.error(msg, args),
}