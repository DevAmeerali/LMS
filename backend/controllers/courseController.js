const Course = require("../models/Course");
const notificationController = require("./notificationController");

// Get all courses (public)
exports.getAllCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

// Create new course
exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const instructorId = req.user.id;

    const newCourse = new Course({
      title,
      description,
      instructor: instructorId,
    });

    await newCourse.save();
    await notificationController.sendCourseCreationNotifications(newCourse);

    res.status(201).json(newCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create course", error: error.message });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  await Course.findByIdAndDelete(id);
  res.json({ message: "Course deleted" });
};

//Get all courses created by the logged-in instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const courses = await Course.find({ instructor: instructorId });
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch instructor's courses" });
  }
};

// Update title/description of instructor’s own course
exports.updateCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (title) req.course.title = title;
    if (description) req.course.description = description;

    await req.course.save();
    res.json(req.course);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

 //Add blog-style content to a course
exports.addCourseContent = async (req, res) => {
  try {
    // console.log("addCourseContent called");
    // console.log("req.course:", req.course);
    // console.log("req.body:", req.body);

    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(400).json({ message: "Title and body required" });
    }

    req.course.content.push({ title, body });
    await req.course.save();

    res.json(req.course);
  } catch (err) {
    // console.error("Error in addCourseContent:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Get a single course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteCourseContent = async (req, res) => {
  try {
    const course = req.course; // from middleware
    const contentId = req.params.contentId;

    // Filter out the content with the matching contentId
    course.content = course.content.filter(item => item._id.toString() !== contentId);

    await course.save();

    res.json(course);
  } catch (err) {
    console.error("Error deleting course content:", err);
    res.status(500).json({ message: "Failed to delete content", error: err.message });
  }
};


