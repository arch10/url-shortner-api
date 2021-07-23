const router = require('express').Router();

const { Url } = require('../models/UrlModel');
const { logger, sendError } = require('../util');
const { saveAnalytics } = require('../service/analyticsService');

router.get('/:code', async (req, res, next) => {
  try {
    const code = req.params.code;

    const remoteIp = req.get('X-Real-IP');
    const { browser, os } = req.useragent;

    const url = await Url.findOne({
      urlCode: code
    });
    if (url) {
      saveAnalytics(code, browser, os, remoteIp);
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
