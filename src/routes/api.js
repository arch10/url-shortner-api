const router = require('express').Router();
const validUrl = require('valid-url');

const { shortenUrl } = require('../service');

const { sendError, logger } = require('../util');

//test route
router.get('/shorten', async (req, res, next) => {
  const { longUrl } = req.body;

  const baseUrl = process.env.BASE_URL;

  if (!validUrl.isUri(baseUrl)) {
    next(sendError(500, 'Invalid Base Url', baseUrl));
    return;
  }

  if (validUrl.isUri(longUrl)) {
    try {
      const url = await shortenUrl(longUrl, baseUrl);
      logger.debug(`Shorted URL. ${url.shortUrl} -> ${url.longUrl}`);
      res.status(200).json(url);
    } catch (error) {
      next(new Error(error.message));
    }
  } else {
    next(sendError(400));
  }
});

module.exports = router;
