const mongoose = require("mongoose");
const Joi = require("joi");

//1. Create a mongoose schema 
const expenseTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    need: {
        type: String,
        required: true,
        enum: ["Primary", "Secondary", "Misc"]
    }
});

//2. Create a mongoose model for the expenseSchema
const ExpenseType = mongoose.model('ExpenseType', expenseTypeSchema);

function validateExpenseType(expenseType) {
    const schema = {
        name: Joi.string().required(),
        need: Joi.string().required()
    }
    const result = Joi.validate(expenseType, schema);
    return result;

}

module.exports.ExpenseType = ExpenseType;
module.exports.validateExpenseType = validateExpenseType;