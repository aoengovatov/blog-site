const express = require("express");
const commentRouter = express.Router({ mergeParams: true });
const commentController = require("../controllers/comment-for-admin-and-moder.controller");

commentRouter.delete("/:postId/comments/:commentId", commentController.deleteComment);

module.exports = postRouter;
