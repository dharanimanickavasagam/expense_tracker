const mongoose = require("mongoose");
const Joi = require("joi");

const householdSchema = new mongoose.Schema({
  currencyFormat: {
    type: String,
    required: true
  }
});

const Household = mongoose.model("Household", householdSchema);

function validateHousehold(household) {
  const schema = {
    currencyFormat: Joi.string().required()
  };
  return Joi.validate(household, schema);
}

module.exports.Household = Household;
module.exports.validateHousehold = validateHousehold;
