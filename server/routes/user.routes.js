const express = require("express");
const userRouter = express.Router({ mergeParams: true });
const userController = require("../controllers/user.controller");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);

module.exports = userRouter;
