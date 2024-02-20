const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../model/User");
require("dotenv").config();

const loginFun = async (req, res) => {
    
    const { userName, userPassword } = req.body;
    const userDoc = await User.findOne({ username: userName });

    if (!userDoc) {
        return res.status(400).json("User not found");
    }

    const isMatching = bcrypt.compareSync(userPassword, userDoc.password);

    if (isMatching) {
        // Generate a JWT token
        jwt.sign({ userName, id: userDoc._id }, process.env.JWT_SECRET, (err, token) => {
            if (err) {
                return res.status(500).json({ error: 'Error generating token' });
            }
            // Send the token in the response
            res.cookie('token',token).json({
                id:userDoc._id,
                userName
            });
            console.log("login done successfully")
        });
    } else {
        res.status(400).json("Wrong credentials");
    }
};

module.exports = loginFun;
