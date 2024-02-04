import bcrypt from "bcrypt";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';


const registerUser = async (req, res) => {
    try{
        const { email, username, mobile, password } = req.body;
    
    //Validat for all fields not to be empty
    if(!email || !username || !mobile || !password){
        res.status(400).json({
            message: "All fields are required"
        })     
    }

    //Check if the user already exists
    const existedUser = await User.findOne({
        $or: [{email}, {username}, {mobile}]
    });

    if(existedUser){
        res.status(409).json({
            message: "User with same email, username or mobile already exists."
        });
    }

    const hashedPassword = await bcrypt.hash(password,10);
    //Creating the user
    const user = await User.create({
      email,
      username,
      mobile,
      password: hashedPassword,
    });


    //Removing password field in response
    const createdUser = await User.findById(user._id).select("-password");

    //Check if user is created or not
    if(!createdUser){
        res.status(500).json({
            message: "Somthing went wrong while registering user"
        })
    };
    const accessToken = await jwt.sign({
      user: {
          id: user._id,
          email: user.email,
          username: user.username,
          mobile: user.mobile
      },
  },
  process.env.ACCESS_TOKEN,
  {expiresIn: '1h',},
  );

    //Returning the registered user
    return res.status(200).json(new ApiResponse(200, {token: accessToken, user: createdUser}, "Signup Successfull"));
    }
    catch(err){
        console.log(err);
    }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User does not exists",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        message: "Invalid Email or password ",
      });
    } else {
        //Sign user with jwt
        const userWOPassword = await User.findById(user._id).select("-password");
    const accessToken = await jwt.sign({
        user: {
            id: user._id,
            email: user.email,
            username: user.username,
            mobile: user.mobile
        },
    },
    process.env.ACCESS_TOKEN,
    {expiresIn: '1h',},
    );
      return res.status(200).json(new ApiResponse(200, {token: accessToken, user: userWOPassword}, "Login Successfull"));
    }
  } catch (err) {
    console.log(err);
  }
};

//Singout user
const singOut = async (req, res) => {
  try{

  }
  catch(e){
    console.log(err);
  }
}

//Test Data
const currentUser = async (req, res) => {
    res.json({message: "Get all users"})
}

//Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body; 
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "365cd42db5c07c",
        pass: "c4975375523b31"
      }
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'sandeshrimal@softechfoundation.com',
      to: email,
      subject: "Reset Password",
      text: "Hello world?",
      html: '',
    });

    console.log("Message sent: %s", info.messageId);
    return res.status(200).json(new ApiResponse(200, "Link Sent Successfully"));
  } catch (e) {
    console.log(e);
    // handle the error appropriately, for example, return an error response
    return res.status(500).json(new ApiResponse(500, e));
  }
};


export { registerUser, loginUser, currentUser, singOut, forgotPassword };