const { Analytics, validator } = require('../models/Analytics');
const { logger } = require('../util');

const saveAnalytics = async (urlCode, browser, os, ip) => {
  try {
    const { value, error } = validator({ urlCode, browser, os, ip });
    if (error) {
      throw new Error(error.details[0].message);
    }
    const analytics = new Analytics(value);
    await analytics.save();
  } catch (error) {
    logger.error(`Failed to log analytics: ${error.message}`);
  }
};

module.exports = {
  saveAnalytics
};
