const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ status: true, token });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

const bcrypt = require('bcryptjs');
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ status: false, message: 'Invalid credentials try again' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ status: true, token });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

const { sendOTP } = require('../utils/sendEmail');
exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: false, message: 'Email not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();  // 6 digit OTP
    await sendOTP(email, otp);

    // Store OTP in DB for later verification (skipping this step for brevity)
    res.json({ status: true, message: 'OTP sent to provided email' });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};
