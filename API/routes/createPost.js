const express = require('express');
const route = express.Router();
const multer = require("multer")
const uploadMiddleware = multer({dest:'uploads/'})
const createPostFun = require("../controllers/createPost")
const showPostsFun = require("../controllers/showPostsFun");
const updatePostFun = require("../controllers/updatePostFun")
const deletePostFun = require("../controllers/deletePostFun")


route.post("/create",uploadMiddleware.single('file'),createPostFun);
route.get('/create',showPostsFun)
route.put("/post",uploadMiddleware.single('file'),updatePostFun)
route.delete("/post/:id",deletePostFun)


module.exports = route;
