const Posts = require("../model/post");

 async function showPostFun(req,res){
   const {id} = req.params;
   const postDoc =await Posts.findById(id).populate('author',["username"])
   res.json(postDoc)

} 

module.exports = showPostFun;