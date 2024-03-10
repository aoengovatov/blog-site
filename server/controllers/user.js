const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

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

    const token = generateToken({ id: user.id });

    return { token, user };
};

//delete

//edit (role)

module.exports = {
    register,
    loginUser,
};
