const User = require("../models/User")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const sendResetEmail = require('../utils/mailer');

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" })
        res.status(201).json({ token, user })
    } catch (error) {
        res.status(400).json({ error: "Signup failed", details: error.message });
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({error: 'User does not exist'})

        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(401).json({error: 'Password incorrect'})

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
        res.json({ token, user });
    } catch (err) {
        res.status(200).json({error:'Error while logging in', details: err.message})
    }
}

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '15m' });

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    await sendResetEmail(user.email, resetLink);
    res.json({ message: "Reset link sent to your email." });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Email failed to send" });
  }
};


exports.resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.password = password;
    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
};


