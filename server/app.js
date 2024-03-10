const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
    register,
    loginUser,
    getUsers,
    getRoles,
    updateUser,
    deleteUser,
} = require("./controllers/user");
const authentificated = require("./middlewares/authentificated");
const hasRole = require("./middlewares/hasRole");
const mapUser = require("./mappers/mapUser");
const config = require("config");
const ROLES = require("./constants/roles");

const port = config.get("port");
const mongoUri = config.get("mongoUri");
const app = express();

app.use(cookieParser());
app.use(express.json());

app.post("/register", async (req, res) => {
    const { login, password } = req.body;

    try {
        const { user, token } = await register(login, password);

        res.cookie("token", token, { httpOnly: true }).send({
            error: null,
            user: mapUser(user),
        });
    } catch (e) {
        res.send({ error: e.message || "Unknown error" });
    }
});

app.post("/login", async (req, res) => {
    const { login, password } = req.body;

    try {
        const { user, token } = await loginUser(login, password);

        res.cookie("token", token, { httpOnly: true }).send({
            error: null,
            user: mapUser(user),
        });
    } catch (e) {
        res.send({ error: e.message || "Unknown error" });
    }
});

app.post("/logout", (req, res) => {
    res.cookie("token", "", { httpOnly: true }).send({});
});

app.use(authentificated);

app.get("/users", hasRole([ROLES.ADMIN]), async (req, res) => {
    const users = await getUsers();

    res.send({ data: users.map(mapUser) });
});

app.get("/users/roles", hasRole([ROLES.ADMIN]), async (req, res) => {
    const roles = await getRoles();

    res.send({ data: roles });
});

app.patch("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
    const newUser = await updateUser(req.params.id, { role: req.body.roleId });

    res.send({ data: mapUser(newUser) });
});

app.delete("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
    await deleteUser(req.params.id);

    res.send({ error: null });
});

mongoose.connect(mongoUri).then(() => {
    app.listen(port, () => {
        console.log(`Server start on port ${port}`);
    });
});
