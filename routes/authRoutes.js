const express = require('express');
const { signup, signin, forgetPassword } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/forgetPassword', forgetPassword);

module.exports = router;
