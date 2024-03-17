const express = require("express");
const userRouter = express.Router({ mergeParams: true });
const userForAdminController = require("../controllers/user-for-admin.controller");

userRouter.get("/", userForAdminController.getUsers);
userRouter.get("/roles", userForAdminController.getRoles);
userRouter.patch("/:id", userForAdminController.updateUser);
userRouter.delete("/:id", userForAdminController.deleteUser);

module.exports = userRouter;
