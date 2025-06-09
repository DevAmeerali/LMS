const express = require("express");
const router = express.Router();
const { getProgress, toggleSection } = require("../controllers/progressController");
const authMiddleware = require("../middleware/authtoken");

router.get("/:courseId", authMiddleware, getProgress);
router.post("/:courseId/toggle/:sectionId", authMiddleware, toggleSection);

module.exports = router;
