const userService = require("../services/user.service");
const mapUser = require("../mappers/mapUser");

exports.register = async (req, res) => {
    const { login, password } = req.body;

    try {
        const { user, token } = await userService.register(login, password);

        res.cookie("token", token, { httpOnly: true }).send({
            error: null,
            user: mapUser(user),
        });
    } catch (e) {
        res.send({ error: e.message || "Unknown error" });
    }
};

exports.login = async (req, res) => {
    const { login, password } = req.body;

    try {
        const { user, token } = await userService.login(login, password);

        res.cookie("token", token, { httpOnly: true }).send({
            error: null,
            user: mapUser(user),
        });
    } catch (e) {
        res.send({ error: e.message || "Unknown error" });
    }
};

exports.logout = (req, res) => {
    res.cookie("token", "", { httpOnly: true }).send({});
};
