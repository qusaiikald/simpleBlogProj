const express = require("express")
const route = express.Router();
const logoutFun =require("../controllers/logoutfun")

 function logoutRoute(){
    route.post("/logout",logoutFun);
    return route;
}

module.exports= {
    logoutRoute
}