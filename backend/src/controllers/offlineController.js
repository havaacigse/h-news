const newsService = require("../services/newsService");
const { publishEvent } = require("../queue/rabbitmq");
const { clearMainNewsCache } = require("../services/cacheService");

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

function getOfflineNews(req, res) {
  return successResponse(res, newsService.getOfflineNews());
}

async function addOffline(req, res) {
  const news = newsService.addOffline(req.params.newsId);

  if (!news) {
    return notFoundResponse(res);
  }

  await clearMainNewsCache();
  publishEvent("news.offline_saved", eventPayload({ newsId: req.params.newsId }));
  return successResponse(res, news);
}

async function removeOffline(req, res) {
  const news = newsService.removeOffline(req.params.newsId);

  if (!news) {
    return notFoundResponse(res);
  }

  await clearMainNewsCache();
  publishEvent("news.offline_removed", eventPayload({ newsId: req.params.newsId }));
  return successResponse(res, news);
}

module.exports = {
  getOfflineNews,
  addOffline,
  removeOffline
};
