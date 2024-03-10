const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { register, loginUser } = require("./controllers/user");
const mapUser = require("./mappers/mapUser");
const config = require("config");

const port = config.get("port");
const mongoUri = config.get("mongoUri");
const app = express();

app.use(cookieParser());
app.use(express.json());

app.post("/register", async (req, res) => {
    const { login, password } = req.body;

    try {
        const user = await register(login, password);
        res.send({ error: null, user: mapUser(user) });
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

mongoose.connect(mongoUri).then(() => {
    app.listen(port, () => {
        console.log(`Server start on port ${port}`);
    });
});
