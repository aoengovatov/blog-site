const express = require("express");
const postRouter = express.Router({ mergeParams: true });
const postForAdminController = require("../controllers/post-for-admin.controller");

postRouter.post("/", postForAdminController.addPost);
postRouter.patch("/:id", postForAdminController.editPost);
postRouter.delete("/:id", postForAdminController.deletePost);

module.exports = postRouter;
