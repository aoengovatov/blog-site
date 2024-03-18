require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user.routes");
const postRoute = require("./routes/post.routes");
const commentRoute = require("./routes/comment.roures");
const commentForAdminAndModerRoute = require("./routes/comment-for-admin-and-moder.routes");
const userForAdminRoute = require("./routes/user-for-admin.routes");
const postForAdminRoute = require("./routes/post-for-admin.routes");
const authentificated = require("./middlewares/authentificated");
const hasRole = require("./middlewares/hasRole");

const ROLES = require("./constants/roles");

const app = express();

app.use(
    cors({
        credentials: true,
        origin: process.env.ORIGIN,
    })
);

app.use(cookieParser());
app.use(express.json());

app.use("/", userRoute);
app.use("/posts", postRoute);

app.use(authentificated);

app.use("/users", hasRole([ROLES.ADMIN]), userForAdminRoute);
app.use("/posts", hasRole([ROLES.ADMIN]), postForAdminRoute);
app.use("/posts", commentRoute);
app.use("/posts", hasRole([ROLES.ADMIN, ROLES.MODERATOR]), commentForAdminAndModerRoute);

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server start on port ${port}`);
    });
});
