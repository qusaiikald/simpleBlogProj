const Posts = require("../model/post");

async function showPostsFun(req, res) {
  res.json(await Posts.find()
  .populate("author",["username"])
  .sort({createdAt:-1})
  .limit(20)
  );
}

module.exports = showPostsFun;
