const Progress = require("../models/Progress");
const Course = require("../models/Course");
const User = require("../models/User");
const path = require("path");
const fs = require("fs");
const generateCertificate = require("../utils/pdfcert");

exports.downloadCertificate = async (req, res) => {
  const { courseId } = req.params;
  const studentId = req.user.id;

  try {
    const progress = await Progress.findOne({ student: studentId, course: courseId });
    if (!progress || !progress.isCompleted) {
      return res.status(400).json({ message: "Course not completed yet." });
    }

    const student = await User.findById(studentId);
    const course = await Course.findById(courseId);

    const fileName = `${studentId}-${courseId}.pdf`;
    const outputPath = path.join(__dirname, "../certificates", fileName);

    if (!fs.existsSync(outputPath)) {
      generateCertificate(student.name, course.title, outputPath);
    }

    setTimeout(() => {
      res.download(outputPath, `${course.title}-certificate.pdf`);
    }, 500); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate certificate." });
  }
};
