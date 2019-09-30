const mongoose = require("mongoose");
const Joi = require("joi");

//1. Create a mongoose schema 
const expenseSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        minlength: 5,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true,
        enum: ["Fixed", "Variable"]
    },
    amount: {
        type: Number,
        min: 1,
        max: 1000,
        required: true
    },
    notes: {
        type: String
    }
});

//2. Create a mongoose model for the expenseSchema
const Expense = mongoose.model('Expense', expenseSchema);

function validateExpense(expense) {
    const schema = {
        _id : Joi.string(),
        date: Joi.date().required(),
        name: Joi.string().min(5).required(),
        type: Joi.string().required(),
        mode: Joi.string().required(),
        amount: Joi.number().required(),
        notes: Joi.any(),
        __v :Joi.number()
    }
    const result = Joi.validate(expense, schema);
    return result;

}

module.exports.Expense = Expense;
module.exports.validateExpense = validateExpense;