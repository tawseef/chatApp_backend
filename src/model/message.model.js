const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./user.model");

const messageSchema = new mongoose.Schema({
    email: { type: String, required: true, validate: (value) => validator.isEmail(value), ref: User },
    messages: { type: [String], required: true, default: [] } // Store messages as an array
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
