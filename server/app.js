const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");
const userForAdminRoute = require("./routes/user-for-admin.routes");
const authentificated = require("./middlewares/authentificated");
const hasRole = require("./middlewares/hasRole");
const postService = require("./services/post.service");
const mapPost = require("./mappers/mapPost");

const config = require("config");
const ROLES = require("./constants/roles");

const port = config.get("port");
const mongoUri = config.get("mongoUri");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/", userRouter);

app.get("posts/", async (req, res) => {
    const { posts, lastPage } = await postService.getPosts(
        req.body.search,
        req.body.limit,
        req.body.page
    );

    res.send({ data: { lastPage, posts: posts.map(mapPost) } });
});

app.get("posts/:id", async (req, res) => {
    const post = await postService.getPost(req.params.id);

    res.send({ data: mapPost(post) });
});

app.use(authentificated);

app.post("/posts", hasRole([ROLES.ADMIN]), async (req, res) => {
    const { title, content, image: imageUrl } = req.body;

    const newPost = await postService.addPost({
        title,
        content,
        image,
    });

    res.send({ data: mapPost(newPost) });
});

app.post("/posts/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
    const { title, content, image: imageUrl } = req.body;

    const updatedPost = await postService.editPost(req.params.id, {
        title,
        content,
        image,
    });

    res.send({ data: mapPost(updatedPost) });
});

app.delete("posts/:id", async (req, res) => {
    await postService.deletePost(req.params.id);

    res.send({ error: null });
});

app.use("/users", hasRole([ROLES.ADMIN]), userForAdminRoute);

mongoose.connect(mongoUri).then(() => {
    app.listen(port, () => {
        console.log(`Server start on port ${port}`);
    });
});
