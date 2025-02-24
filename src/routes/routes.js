const express = require("express");
const router = express.Router();
const { handleUserSignup, handleUserLogin, handleGetUser, handleSendMessage } = require("../controller/user.controller");
const { validateSchema } = require("../middlewares/validate.middleware");
const {loginBodyValidaton, signUpBodyValidation} = require("../validation/auth.validator")

// Schema Validation for Login
const validateLogin = validateSchema(loginBodyValidaton);    

// Schema Validation for Signup
const validateSignup = validateSchema(signUpBodyValidation);    

// User Signup
router.post("/signup",validateSignup, handleUserSignup);

// User Login
router.post("/login", validateLogin, handleUserLogin);

// Get All Users
router.get("/users", handleGetUser);

//Sending Message
router.post("/sendmessage", handleSendMessage);


module.exports = router