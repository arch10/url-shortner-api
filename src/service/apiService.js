const validUrl = require('valid-url');
const { nanoid } = require('nanoid');

const { Url, validator } = require('../models/UrlModel');

const shortenUrl = async (longUrl, baseUrl, remoteIp) => {
  const urlCode = nanoid(10);

  let url = await Url.findOne({
    longUrl
  });

  if (url) {
    return url;
  } else {
    const shortUrl = baseUrl + '/' + urlCode;
    const { value, error } = validator({
      longUrl,
      shortUrl,
      urlCode,
      remoteIp
    });
    if (error) {
      throw new Error(error.details[0].message);
    }
    url = new Url(value);
    const savedUrl = await url.save();
    return savedUrl;
  }
};

module.exports = { shortenUrl };
