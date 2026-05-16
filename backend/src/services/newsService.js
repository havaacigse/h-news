const newsData = require("../data/newsData");

function getAllNews(category) {
  if (!category) {
    return newsData;
  }

  return newsData.filter((news) => news.category.toLowerCase() === category.toLowerCase());
}

function getNewsById(id) {
  return newsData.find((news) => news.id === id);
}

function searchNews(query) {
  if (!query || !query.trim()) {
    return [];
  }

  const searchText = query.trim().toLowerCase();

  return newsData.filter((news) => {
    return (
      news.title.toLowerCase().includes(searchText) ||
      news.summary.toLowerCase().includes(searchText) ||
      news.content.toLowerCase().includes(searchText) ||
      news.category.toLowerCase().includes(searchText)
    );
  });
}

function getPopularNews() {
  return [...newsData].sort((firstNews, secondNews) => secondNews.popularity - firstNews.popularity);
}

function getRecentNews() {
  return [...newsData].sort((firstNews, secondNews) => secondNews.publishedTimestamp - firstNews.publishedTimestamp);
}

function markAsRead(id, isRead) {
  const news = getNewsById(id);

  if (!news) {
    return null;
  }

  news.isRead = isRead;
  return news;
}

function addFavorite(id) {
  const news = getNewsById(id);

  if (!news) {
    return null;
  }

  news.isFavorite = true;
  return news;
}

function removeFavorite(id) {
  const news = getNewsById(id);

  if (!news) {
    return null;
  }

  news.isFavorite = false;
  news.favoriteNote = null;
  news.favoriteTag = null;
  return news;
}

function getFavorites() {
  return newsData.filter((news) => news.isFavorite);
}

function updateFavorite(id, note, tag) {
  const news = getNewsById(id);

  if (!news) {
    return null;
  }

  if (!news.isFavorite) {
    news.isFavorite = true;
  }

  if (note !== undefined) {
    const trimmedNote = String(note).trim();
    news.favoriteNote = trimmedNote.length > 0 ? trimmedNote : null;
  }

  if (tag !== undefined) {
    const trimmedTag = String(tag).trim();
    news.favoriteTag = trimmedTag.length > 0 ? trimmedTag : null;
  }

  return news;
}

function addOffline(id) {
  const news = getNewsById(id);

  if (!news) {
    return null;
  }

  news.isOfflineSaved = true;
  return news;
}

function removeOffline(id) {
  const news = getNewsById(id);

  if (!news) {
    return null;
  }

  news.isOfflineSaved = false;
  return news;
}

function getOfflineNews() {
  return newsData.filter((news) => news.isOfflineSaved);
}

module.exports = {
  getAllNews,
  getNewsById,
  searchNews,
  getPopularNews,
  getRecentNews,
  markAsRead,
  addFavorite,
  removeFavorite,
  getFavorites,
  updateFavorite,
  addOffline,
  removeOffline,
  getOfflineNews
};
