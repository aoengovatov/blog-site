const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { register } = require("./controllers/user");
const mapUser = require("./mappers/mapUser");

const port = 3001;
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

mongoose
    .connect(
        'mongodb+srv://aoengovatov:<password>@cluster0.ndz6eui.mongodb.net/blog-site?retryWrites=true&w=majority&appName=Cluster0"'
    )
    .then(() => {
        app.listen(port, () => {
            console.log(`Server start on port ${port}`);
        });
    });
