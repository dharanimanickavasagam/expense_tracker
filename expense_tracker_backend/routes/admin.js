const express = require("express");
const router = express.Router();
const {
    auth
} = require("../middleware/auth")
router.use(express.json());
router.use(auth);


//get request for all the expenses in the database 
router.get("/", async (req, res) => {
    const isAdmin = req.user.isAdmin;

    if (!isAdmin)
        //401 - unauth - invalid jwt, give a chance to try again
        //403 - Forbidden - valid jwt but no permissions, then send 403 
        return res.status(403).send("Not an admin user")
    res.send("Admin user ")
});


module.exports = router;