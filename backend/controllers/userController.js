const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};


exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
};


exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect current password" });

    user.password = newPassword;
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.uploadProfilePic = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePicture: `/uploads/${req.file.filename}` },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
};
