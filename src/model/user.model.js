const mongoose =require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
    name:{type: String, required: true, unique: true}, 
    email:{type: String, required: true, unique: true, validate : (value)=> validator.isEmail(value)}, 
    phone:{type: String, required: true},
    password:{type: String, required: true}
})

const User = mongoose.model("user", userSchema)

module.exports = User;