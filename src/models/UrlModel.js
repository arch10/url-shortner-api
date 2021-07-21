const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const URLSchema = new Schema(
  {
    urlCode: {
      type: String,
      required: true
    },
    longUrl: {
      type: String,
      required: true
    },
    shortUrl: {
      type: String,
      required: true
    },
    createdAt: {
      type: Number,
      default: new Date().getTime(),
      required: true
    },
    updatedAt: {
      type: Number,
      default: new Date().getTime(),
      required: true
    }
  },
  {
    timestamps: {
      currentTime: () => new Date().getTime(),
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);

const validationSchema = Joi.object({
  urlCode: Joi.string().required(),
  longUrl: Joi.string().required(),
  shortUrl: Joi.string().required()
}).options({ stripUnknown: true });

function validator(data) {
  return validationSchema.validate(data);
}

module.exports.Url = mongoose.model('Url', URLSchema);
module.exports.validator = validator;
