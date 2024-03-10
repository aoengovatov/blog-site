const User = require("../models/User");

module.exports = async function (req, res, next) {
    const tokenData = verufy(res.cookie.token);

    const user = await User.findOne({ _id: tokenData.id });

    if (!user) {
        res.send({ error: "Authentification user not found" });

        return;
    }

    req.user = user;

    next();
};
