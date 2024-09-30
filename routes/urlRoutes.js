const express = require('express');
const { shortenUrl, getUrl } = require('../controllers/urlController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/url/shorten', authMiddleware, shortenUrl);
router.get('/:urlCode', getUrl);

module.exports = router;
