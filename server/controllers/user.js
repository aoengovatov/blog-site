const bcrypt = require("bcrypt");
const User = require("../models/User");

const register = async (login, password) => {
    if (!password) {
        throw new Error("Password is empty");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({ login, password: passwordHash });
    return user;
};

//login

//logout

//delete

//edit (role)

module.exports = {
    register,
};
