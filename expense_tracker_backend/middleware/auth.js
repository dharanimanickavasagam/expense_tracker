const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {

    const token = req.header("x-auth-token");

    if (!token)
        //401 means access denied
        return res.status(401).send("Access denied");

    try {
        const payload = jwt.verify(token, config.get("jwtPrivateKey"));
        req.user = payload;
        next();
    } catch (ex) {
        return res.status(400).send("Invalid Token");
    }
}

module.exports.auth = auth;