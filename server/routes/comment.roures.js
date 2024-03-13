const express = require("express");
const commentRouter = express.Router({ mergeParams: true });
const commentController = require("../controllers/comment.controller");

commentRouter.post("/:id/comments", commentController.addComment);

module.exports = commentRouter;
