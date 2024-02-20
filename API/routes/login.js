const express = require("express")
const router = express.Router();
const loginFun = require("../controllers/loginFun")
const loginRoute = () => {
        router.post("/login", loginFun);
        return router;
}


module.exports = {
        loginRoute
};
