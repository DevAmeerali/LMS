const express = require("express");
const authenticateToken = require("../middleware/authtoken");
const checkInstructorOwnership = require("../middleware/checkInstructorOwnership");
// const { markSectionComplete, getCourseProgress } = require("../controllers/progressController");

const {
  getAllCourses,
  createCourse,
  deleteCourse,
  getInstructorCourses,
  updateCourse,
  addCourseContent,
  getCourseById,
  deleteCourseContent
} = require("../controllers/courseController");

const router = express.Router();

router.get("/", getAllCourses);
router.post("/", authenticateToken, createCourse);
router.delete("/:id", authenticateToken, deleteCourse);
router.get("/instructor", authenticateToken, getInstructorCourses);
router.put("/:id", authenticateToken, checkInstructorOwnership, updateCourse);
router.put("/:id/content", authenticateToken, checkInstructorOwnership, addCourseContent);
router.get("/:id", authenticateToken, getCourseById);
router.delete("/:id/content/:contentId", authenticateToken, checkInstructorOwnership, deleteCourseContent);
// router.post("/:courseId/complete/:contentId", authenticateToken, markSectionComplete);
// router.get("/:courseId/progress", authenticateToken, getCourseProgress);


module.exports = router;
