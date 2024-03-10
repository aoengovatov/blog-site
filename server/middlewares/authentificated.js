const User = require("../models/User");
const { verify } = require("../utils/token");

module.exports = async function (req, res, next) {
    const tokenData = verify(req.cookies.token);

    const user = await User.findOne({ _id: tokenData.id });

    if (!user) {
        res.send({ error: "Authentification user not found" });

        return;
    }

    req.user = user;

    next();
};
