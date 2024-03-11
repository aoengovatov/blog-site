const userService = require("../services/user.service");
const mapUser = require("../mappers/mapUser");

exports.getUsers = async (req, res) => {
    const users = await userService.getUsers();

    res.send({ data: users.map(mapUser) });
};

exports.getRoles = async (req, res) => {
    const roles = await userService.getRoles();

    res.send({ data: roles });
};

exports.updateUser = async (req, res) => {
    const newUser = await userService.updateUser(req.params.id, {
        role: req.body.roleId,
    });

    res.send({ data: mapUser(newUser) });
};

exports.deleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);

    res.send({ error: null });
};
