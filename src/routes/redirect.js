const router = require('express').Router();

const { Url } = require('../models/UrlModel');
const { logger, sendError } = require('../util');

router.get('/:code', async (req, res, next) => {
  try {
    const code = req.params.code;

    const url = await Url.findOne({
      urlCode: code
    });
    if (url) {
      logger.debug(`Redirecting. ${url.shortUrl} -> ${url.longUrl}`);
      return res.redirect(url.longUrl);
    } else {
      next(sendError(404, 'Url not found', code));
      return;
    }
  } catch (error) {
    next(new Error(error.message));
  }
});

module.exports = router;
