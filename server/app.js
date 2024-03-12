const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user.routes");
const postRoute = require("./routes/post.routes");
const userForAdminRoute = require("./routes/user-for-admin.routes");
const postForAdminRoute = require("./routes/post-for-admin.routes");
const authentificated = require("./middlewares/authentificated");
const hasRole = require("./middlewares/hasRole");
const commentService = require("./services/comment.service");
const mapComment = require("./mappers/mapComment");

const config = require("config");
const ROLES = require("./constants/roles");

const port = config.get("port");
const mongoUri = config.get("mongoUri");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/", userRoute);
app.use("/posts", postRoute);

app.use(authentificated);

app.post("/posts/:id/comments", async (req, res) => {
    const newComment = await commentService.addComment(req.params.id, {
        content: req.body.content,
        author: req.user.id,
    });

    res.send({ data: mapComment(newComment) });
});

app.delete(
    "/posts/:postId/comments/:commentId",
    hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
    async (req, res) => {
        await commentService.deleteComment(req.params.postId, req.params.commentId);

        res.send({ error: null });
    }
);

app.use("/users", hasRole([ROLES.ADMIN]), userForAdminRoute);
app.use("/posts", hasRole([ROLES.ADMIN]), postForAdminRoute);

mongoose.connect(mongoUri).then(() => {
    app.listen(port, () => {
        console.log(`Server start on port ${port}`);
    });
});
