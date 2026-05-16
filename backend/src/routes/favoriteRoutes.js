const express = require("express");
const favoriteController = require("../controllers/favoriteController");

const router = express.Router();

router.get("/", favoriteController.getFavorites);
router.post("/:newsId", favoriteController.addFavorite);
router.patch("/:newsId", favoriteController.updateFavorite);
router.delete("/:newsId", favoriteController.removeFavorite);

module.exports = router;
