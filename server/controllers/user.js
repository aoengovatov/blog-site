const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generate } = require("../utils/token");

const register = async (login, password) => {
    if (!password) {
        throw new Error("Password is empty");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({ login, password: passwordHash });
    return user;
};

const loginUser = async (login, password) => {
    const user = await User.findOne({ login });

    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error("Wrong password");
    }

    const token = generate({ id: user.id });

    return { token, user };
};

//delete

//edit (role)

module.exports = {
    register,
    loginUser,
};
