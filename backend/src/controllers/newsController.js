const newsService = require("../services/newsService");
const { publishEvent } = require("../queue/rabbitmq");
const {
  getCache,
  setCache,
  clearMainNewsCache
} = require("../services/cacheService");

function eventPayload(extraPayload = {}) {
  return {
    ...extraPayload,
    timestamp: new Date().toISOString()
  };
}

function successResponse(res, data) {
  return res.json({
    success: true,
    data
  });
}

function notFoundResponse(res) {
  return res.status(404).json({
    success: false,
    message: "News not found"
  });
}

async function cachedResponse(res, key, getData) {
  const cachedData = await getCache(key);

  if (cachedData) {
    return successResponse(res, cachedData);
  }

  const data = getData();
  await setCache(key, data);
  return successResponse(res, data);
}

async function getAllNews(req, res) {
  const cacheKey = req.query.category
    ? `news:category:${req.query.category}`
    : "news:all";

  return cachedResponse(res, cacheKey, () => {
    return newsService.getAllNews(req.query.category);
  });
}

function getNewsById(req, res) {
  const selectedNews = newsService.getNewsById(req.params.id);

  if (!selectedNews) {
    return notFoundResponse(res);
  }

  publishEvent("news.viewed", eventPayload({ newsId: req.params.id }));
  return successResponse(res, selectedNews);
}

async function searchNews(req, res) {
  const query = req.query.q || "";
  publishEvent("news.searched", eventPayload({ query: req.query.q || "" }));
  return cachedResponse(res, `news:search:${query}`, () => {
    return newsService.searchNews(query);
  });
}

async function getPopularNews(req, res) {
  return cachedResponse(res, "news:popular", () => newsService.getPopularNews());
}

async function getRecentNews(req, res) {
  return cachedResponse(res, "news:recent", () => newsService.getRecentNews());
}

async function markAsRead(req, res) {
  const news = newsService.markAsRead(req.params.id, true);

  if (!news) {
    return notFoundResponse(res);
  }

  await clearMainNewsCache();
  publishEvent("news.read_marked", eventPayload({ newsId: req.params.id }));
  return successResponse(res, news);
}

async function markAsUnread(req, res) {
  const news = newsService.markAsRead(req.params.id, false);

  if (!news) {
    return notFoundResponse(res);
  }

  await clearMainNewsCache();
  publishEvent("news.unread_marked", eventPayload({ newsId: req.params.id }));
  return successResponse(res, news);
}

module.exports = {
  getAllNews,
  getNewsById,
  searchNews,
  getPopularNews,
  getRecentNews,
  markAsRead,
  markAsUnread
};
