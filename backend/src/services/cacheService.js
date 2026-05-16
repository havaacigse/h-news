const { createClient } = require("redis");

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
const defaultTTLSeconds = Number(process.env.CACHE_TTL_SECONDS || 60);

let redisClient = null;
let isConnected = false;

async function connectRedis() {
  try {
    redisClient = createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: false
      }
    });

    redisClient.on("error", (error) => {
      isConnected = false;
      console.warn("Redis connection error:", error.message);
    });

    redisClient.on("end", () => {
      isConnected = false;
      console.warn("Redis connection closed. Cache is disabled.");
    });

    await redisClient.connect();
    isConnected = true;
    console.log("Redis connected. Cache is enabled.");
  } catch (error) {
    isConnected = false;
    redisClient = null;
    console.warn(`Redis disabled: ${error.message}`);
  }
}

async function getCache(key) {
  if (!isConnected || !redisClient) {
    return null;
  }

  try {
    const cachedValue = await redisClient.get(key);
    return cachedValue ? JSON.parse(cachedValue) : null;
  } catch (error) {
    console.warn(`Redis get failed for ${key}:`, error.message);
    return null;
  }
}

async function setCache(key, value, ttlSeconds = defaultTTLSeconds) {
  if (!isConnected || !redisClient) {
    console.warn(`Redis disabled. Cache set skipped: ${key}`);
    return;
  }

  try {
    await redisClient.set(key, JSON.stringify(value), {
      EX: ttlSeconds
    });
  } catch (error) {
    console.warn(`Redis set failed for ${key}:`, error.message);
  }
}

async function deleteCache(key) {
  if (!isConnected || !redisClient) {
    console.warn(`Redis disabled. Cache delete skipped: ${key}`);
    return;
  }

  try {
    await redisClient.del(key);
  } catch (error) {
    console.warn(`Redis delete failed for ${key}:`, error.message);
  }
}

async function clearMainNewsCache() {
  await Promise.all([
    deleteCache("news:all"),
    deleteCache("news:popular"),
    deleteCache("news:recent")
  ]);
  // Category and search cache keys expire quickly with TTL, so this student-level
  // demo keeps invalidation simple and predictable.
}

function getRedisStatus() {
  return isConnected ? "enabled" : "disabled";
}

module.exports = {
  connectRedis,
  getCache,
  setCache,
  deleteCache,
  clearMainNewsCache,
  getRedisStatus
};
