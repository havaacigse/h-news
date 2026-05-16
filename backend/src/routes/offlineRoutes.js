const express = require("express");
const offlineController = require("../controllers/offlineController");

const router = express.Router();

router.get("/", offlineController.getOfflineNews);
router.post("/:newsId", offlineController.addOffline);
router.delete("/:newsId", offlineController.removeOffline);

module.exports = router;
