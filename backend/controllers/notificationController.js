const Notification = require("../models/Notification");
const User = require("../models/User");

exports.sendCourseCreationNotifications = async (course) => {
  try {
    const students = await User.find({ role: "student" });
    if (students.length === 0) return;

    const notifications = students.map(student => ({
      student: student._id,
      course: course._id,
      message: `New course "${course.title}" is now available. Enroll now!`,
    }));

    await Notification.insertMany(notifications);
  } catch (error) {
    console.error("Failed to send notifications", error);
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const studentId = req.user.id;
    const notifications = await Notification.find({ student: studentId })
      .populate("course", "title")
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications", error: error.message });
  }
};
