const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 60 * 15, checkperiod: 120, useClones: false });

function getCache(key) {
  return cache.get(key);
}

function setCache(key, value, ttlSeconds = 60 * 15) {
  cache.set(key, value, ttlSeconds);
  return value;
}

module.exports = { getCache, setCache };
