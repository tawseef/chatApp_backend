const httpStatus = require("http-status");
const AuthService = require("../service/userAuth.service");
const AuthServiceInstance = new AuthService();
const {getAllUser, sendMessage}  = require("../service/user.service");

// Signup Function
async function handleUserSignup(req, res) {
  try {
    const user = await AuthServiceInstance.signup(req.body);
    return res
      .status(httpStatus.OK)
      .json({ message: "Signup Successful", username: user.name });
  } catch (error) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Check credential", error });
  }
}

// Login Function
async function handleUserLogin(req, res) {
  try {
    const result = await AuthServiceInstance.login(req.body);
    // Storing token to cookie
    res.cookie("token", result.token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    })
    return res.json(result);
  } catch (error) {
    res
    .status(httpStatus.BAD_REQUEST)
    .json({ message: "User does not exist", error });
  } 
}

//Get User Function
async function handleGetUser(req, res) {
  try{
    const { email } = req.body
    if(!email) res
    .status(httpStatus.OK)
    .json({"msg":"Email is required"}); 
    const result = await getAllUser(email);
    if(result)
      res
      .status(httpStatus.OK)
      .json(result);
    else res
      .status(httpStatus.NOT_FOUND)
      .json({ message: "No user found"});
  }catch(error){
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "error", error });  
  }
}

// Send Message
const handleSendMessage = async (req, res) => {
  try{
    const {email} = req.query;
    const {message} = req.body;
    
    if(!email || !message) 
      res.status(httpStatus.BAD_REQUEST).json({ message: "Parameter is required"});
    
    const result = await sendMessage(email, message)
    if(result)
      res.status(httpStatus.OK).json(result);
    else res.status(httpStatus.NOT_FOUND).json({ message: "No user found with email"});    
  }catch(error){
    res.status(httpStatus.BAD_REQUEST).json({ message: "error", error });   
  }
}

module.exports = { handleUserSignup, handleUserLogin, handleGetUser, handleSendMessage };