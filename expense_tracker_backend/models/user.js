const mongoose = require("mongoose");
const Joi = require("joi");


//create a schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 1024
    }
});

//create a model 
const User = mongoose.model('User', userSchema);

//validate with Joi

function validateUser(user) {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(2).max(255).required()
    };

    return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validateUser = validateUser;