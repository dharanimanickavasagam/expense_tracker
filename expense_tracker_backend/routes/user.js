const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const {
    User,
    validateUser
} = require("../models/user");
const {
    auth
} = require("../middleware/auth")

const router = express.Router();
router.use(express.json());

//get the current authenticated user
router.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");

    if (!user)
        return res.status(400).send("User is not found");
    res.send(user)

});

//create a new user 
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
        password: hashedPassword,
        isAdmin: req.body.isAdmin
    });

    user = await user.save();

    const token = user.generateAuthToken();
    res.header("x-auth-token", token)
    .header("access-control-expose-headers","x-auth-token")
    .send(user);
});

module.exports = router;