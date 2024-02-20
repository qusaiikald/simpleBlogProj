const express = require('express');
const Posts = require("../model/post")
const route = express.Router();
const showPostFun = require("../controllers/postPageFun")

    route.get(`/post/:id`,showPostFun
    // async (req,res)=>{
    // const {id} = req.params;
    // const postDoc =await Posts.findById(id).populate('author',["username"])
    // res.json(postDoc)
    );

module.exports = route;