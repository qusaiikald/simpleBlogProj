function logoutFun(req,res){
    res.cookie('token').json("ok");
 }
module.exports= logoutFun;