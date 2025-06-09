const express = require("express");
const router = express.Router();
const { downloadCertificate } = require("../controllers/certificateController");
const authenticateToken = require("../middleware/authtoken"); // use your existing auth middleware

router.get("/download/:courseId", authenticateToken, downloadCertificate);

module.exports = router;
