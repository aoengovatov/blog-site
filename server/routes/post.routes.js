const express = require("express");
const postRouter = express.Router({ mergeParams: true });
const postController = require("../controllers/post.controller");

postRouter.get("/", postController.getPosts);
postRouter.get("/:id", postController.getPost);

module.exports = postRouter;
