const express = require("express");
const {
    User
} = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();
router.use(express.json());


router.post("/", async (req, res) => {
    const {
        error
    } = authenticateUser(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    const user = await User.findOne({
        email: req.body.email
    });

    if (!user)
        return res.status(400).send("Invalid Username or Password");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send("Invalid Username or Password");


    const token = jwt.sign({
        _id: user._id
    }, config.get("jwtPrivateKey"));

    res.send(token);

});


function authenticateUser(user) {
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().min(2).max(255).required()
    };

    return Joi.validate(user, schema);
}


module.exports = router;