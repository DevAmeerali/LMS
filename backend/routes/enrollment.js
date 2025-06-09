const express = require("express");
const authenticateToken = require("../middleware/authtoken");
const router = express.Router();

const {
  enrollInCourse,
  getEnrolledCourses,
} = require("../controllers/enrollmentController");

router.post("/", authenticateToken, enrollInCourse);
router.get("/", authenticateToken, getEnrolledCourses);

module.exports = router;
