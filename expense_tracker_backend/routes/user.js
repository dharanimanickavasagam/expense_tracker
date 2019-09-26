const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const {
    User,
    validateUser
} = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("config")



const router = express.Router();
router.use(express.json());


router.post("/", async (req, res) => {
    const {
        error
    } = validateUser(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    const isExistingUser = await User.findOne({
        email: req.body.email
    });


    if (isExistingUser)
        return res.status(400).send("The Email is already in use");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    user = await user.save();

    const token = jwt.sign({
        _id: user._id
    }, config.get("jwtPrivateKey"));

    res.header("x-auth-token", token).send(user);
});

module.exports = router;