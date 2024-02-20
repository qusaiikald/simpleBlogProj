const User = require("../model/User")
const registerFun = async(req, res) => {
    const {username,password} = req.body;
    try {
            const user = await User.create({username,password})
            res.json(user)
    } catch (error) {
            res.status(400).json(error)
    }
    

};

module.exports = registerFun;


