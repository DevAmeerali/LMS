const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfilePic
} = require('../controllers/userController');
const authenticateToken = require('../middleware/authtoken');
const upload = require("../utils/multer");

// const multer = require('multer');

// multer setup (can move to /utils if preferred)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`)
// });
// const upload = multer({ storage });

router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.put('/change-password', authenticateToken, changePassword);
router.post('/upload-profile-pic', authenticateToken, upload.single('image'), uploadProfilePic);

module.exports = router;
