const mongoose = require("mongoose");
const Joi = require("Joi");
const {ExpenseType} = require("../models/expenseType")

//Step 1: Create mongoose schema 
const budgetSchema = new mongoose.Schema({
    expenseType : {
        type: mongoose.Schema.Types.ObjectId,
        ref: ExpenseType
    },
    funds : { 
        type : Number,
        required : true
    }
});

//Step2 : create mongoose model 
const Budget = mongoose.model("Budget",budgetSchema); 

//Step 3: define joi validation for the mongoose schema
function validateBudget(budget) { 

    const schema = { 
        _id: Joi.string(),
        expenseType: Joi.string().required(),
        funds : Joi.number().required()
    }
   return Joi.validate(budget,schema);
}

module.exports.validateBudget = validateBudget;
module.exports.Budget= Budget;