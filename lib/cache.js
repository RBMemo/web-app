const { createClient } = require('redis');
const { logger } = require('./logger');

const REDIS_CLIENT_OPTIONS = {
  url: `redis://${process.env.REDIS_HOST}:6379`
};

let cache;

async function connect() {
  cache = createClient(REDIS_CLIENT_OPTIONS);  
  cache.on('error', e => logger.error(`[Cache] ${e}`));
  cache.on('ready', () => logger.info('[Cache] redis connected'));
  cache.on('reconnecting', () => logger.info('[Cache] redis reconnecting'));

  await cache.connect();
}

async function jSet(key, value, options) {
  return await cache.set(key, JSON.stringify(value), options);
}

async function jGet(key) {
  return JSON.parse(await cache.get(key));
}

async function set(key, value, options) {
  return await cache.set(key, value, options);
}

async function get(key) {
  return await cache.get(key);
}

async function del(key) {
  return await cache.del(key);
}

module.exports = {
  connect,
  jSet,
  jGet,
  set,
  get,
  del
}
