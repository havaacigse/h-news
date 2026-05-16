const express = require("express");
const newsController = require("../controllers/newsController");

const router = express.Router();

router.get("/", newsController.getAllNews);
router.get("/search", newsController.searchNews);
router.get("/popular", newsController.getPopularNews);
router.get("/recent", newsController.getRecentNews);
router.get("/:id", newsController.getNewsById);
router.patch("/:id/read", newsController.markAsRead);
router.patch("/:id/unread", newsController.markAsUnread);

module.exports = router;
