const mongoose = require("mongoose")
const {Schema,model} = require ("mongoose"); 
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        min:4,
    },
    password:{
        type:String,
        required:true,
    },
});

userSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})



const userModel = model('User',userSchema);
module.exports = userModel