const jwt = require("jsonwebtoken");
const config = require("config");
const sign = config.get("sign_jwt");

module.exports = {
    generate(data) {
        return jwt.sign(data, sign, { expiresIn: "30d" });
    },
    verify(token) {
        return jwt.verify(token, sign);
    },
};
