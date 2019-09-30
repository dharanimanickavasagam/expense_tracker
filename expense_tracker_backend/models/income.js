const mongoose = require("mongoose");
const Joi = require("joi");

//1. create an incomeSchema for the collection income 
const incomeSchema = new mongoose.Schema({
    date: {
        type: Date
    },
    payer: {
        type: String,
        minlength: 2,
        required: true
    },
    income: {
        type: Number,
        required: true
    },
    notes: {
        type: String
    }
});

//2. Create a mongoose model for the schema 
const Income = mongoose.model('Income', incomeSchema);

//3. Joi validator 
function validateIncome(income) {
    const schema = {
        _id : Joi.string(),
        date: Joi.date().required(),
        payer: Joi.string().min(2).required(),
        income: Joi.number().required(),
        notes: Joi.any(),
        __v :Joi.number()
    }

    return Joi.validate(income, schema);
}

module.exports.Income = Income;
module.exports.validateIncome = validateIncome;