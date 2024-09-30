const shortid = require('shortid');
const Url = require('../models/Url');
const validator = require('validator');


exports.shortenUrl = async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  if (!validator.isURL(longUrl)) {
    return res.status(400).json({ status: false, message: 'Invalid long URL' });
  }

  const urlCode = shortid.generate();
  let shortUrl = `${baseUrl}/${urlCode}`;

  try {
    const existingUrl = await Url.findOne({ longUrl });
    if (existingUrl) {
      return res.json({ status: true, data: existingUrl });
    }

    const url = new Url({ urlCode, longUrl, shortUrl });
    await url.save();

    res.json({ status: true, data: { longUrl, shortUrl, urlCode } });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


