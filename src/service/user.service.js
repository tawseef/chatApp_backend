const Message = require("../model/message.model");
const User = require("../model/user.model");

const getAllUser = async (email) => {
  try {
    const res = await User.find({ email: email });
    if (res) return res;
    else return null;
  } catch (error) {
    throw error;
  }
}

const sendMessage = async (email, newMessage) => {
  try {
    const result = await Message.findOneAndUpdate(
      { email },
      { $push: { messages: newMessage } },
      { upsert: true, new: true }
    )
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = { getAllUser, sendMessage };
