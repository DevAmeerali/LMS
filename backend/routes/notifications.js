const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authtoken");
const notificationsController = require("../controllers/notificationController");

router.get("/", authenticateToken, notificationsController.getNotifications);

module.exports = router;
