const Course = require("../models/Course");

const checkInstructorOwnership = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;


    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.instructor.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    req.course = course;
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal error in ownership check" });
  }
};

module.exports = checkInstructorOwnership;
