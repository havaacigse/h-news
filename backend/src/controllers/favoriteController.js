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

function getFavorites(req, res) {
  return successResponse(res, newsService.getFavorites());
}

async function addFavorite(req, res) {
  const news = newsService.addFavorite(req.params.newsId);

  if (!news) {
    return notFoundResponse(res);
  }

  await clearMainNewsCache();
  publishEvent("news.favorited", eventPayload({ newsId: req.params.newsId }));
  return successResponse(res, news);
}

async function removeFavorite(req, res) {
  const news = newsService.removeFavorite(req.params.newsId);

  if (!news) {
    return notFoundResponse(res);
  }

  await clearMainNewsCache();
  publishEvent("news.unfavorited", eventPayload({ newsId: req.params.newsId }));
  return successResponse(res, news);
}

async function updateFavorite(req, res) {
  const news = newsService.updateFavorite(
    req.params.newsId,
    req.body.note,
    req.body.tag
  );

  if (!news) {
    return notFoundResponse(res);
  }

  await clearMainNewsCache();
  publishEvent(
    "favorite.updated",
    eventPayload({
      newsId: req.params.newsId,
      note: req.body.note,
      tag: req.body.tag
    })
  );

  return successResponse(res, news);
}

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
  updateFavorite
};
