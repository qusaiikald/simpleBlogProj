const multer = require("multer")
const Post = require("../model/post")
const jwt = require('jsonwebtoken');
const fs = require("fs");
const { Schema } = require("mongoose");
require('dotenv').config();


async function createPostFun(req,res){

    const {token} = req.cookies;
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length-1];
    const newPath = path+'.'+ext;
    fs.renameSync(path,newPath);

    jwt.verify(token,process.env.JWT_SECRET,{},async (err,info)=>{
        if (err) throw err;

      const {title,summary,content} = req.body;
      const postDoc =  await Post.create({
        title,
        summary,
        content,
        cover:newPath,
        author:info.id
    });

    res.json(postDoc);  
    })
}

module.exports = createPostFun;
