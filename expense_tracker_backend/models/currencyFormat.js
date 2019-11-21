const mongoose = require("mongoose");
const Joi = require("joi");

const currencyFormatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  }
});

const CurrencyFormat = mongoose.model("CurrencyFormat", currencyFormatSchema);

function validateCurrencyFormat(currencyFormat) {
  const schema = {
    name: Joi.string().required(),
    symbol: Joi.string().required()
  };
  return Joi.validate(currencyFormat, schema);
}

module.exports.validateCurrencyFormat = validateCurrencyFormat;
module.exports.CurrencyFormat = CurrencyFormat;
