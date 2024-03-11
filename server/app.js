const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");
const userForAdminRoute = require("./routes/user-for-admin.routes");
const authentificated = require("./middlewares/authentificated");
const hasRole = require("./middlewares/hasRole");

const config = require("config");
const ROLES = require("./constants/roles");

const port = config.get("port");
const mongoUri = config.get("mongoUri");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/", userRouter);

app.use(authentificated);

app.use("/users", hasRole([ROLES.ADMIN]), userForAdminRoute);

mongoose.connect(mongoUri).then(() => {
    app.listen(port, () => {
        console.log(`Server start on port ${port}`);
    });
});
