const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const AnalyticsSchema = new Schema(
  {
    urlCode: {
      type: String,
      required: true
    },
    timestamp: {
      type: Number,
      default: new Date().getTime(),
      required: true
    },
    browser: {
      type: String,
      default: 'Unknown'
    },
    os: {
      type: String,
      default: 'Unknown'
    },
    ip: {
      type: String,
      default: 'Unknown'
    }
  },
  {
    timestamps: {
      currentTime: () => new Date().getTime(),
      createdAt: 'timestamp'
    }
  }
);

const validationSchema = Joi.object({
  urlCode: Joi.string().required(),
  browser: Joi.string(),
  os: Joi.string(),
  ip: Joi.string()
}).options({ stripUnknown: true });

function validator(data) {
  return validationSchema.validate(data);
}

module.exports.Analytics = mongoose.model('Analytics', AnalyticsSchema);
module.exports.validator = validator;
