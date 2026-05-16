const User = require('../models/user');
const bcrypt = require('bcryptjs');
const generateToken = require('../src/utils/generateToken');


// register user
const registerUser = async(req,res) =>{
    try {
        const {name,email,password}= req.body;
        const userExists = await User.findOne({email});
        if(userExists){
           return res.status(400).json({message: "User already exists"});
        }
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(password,salt);
 

 const user = await User.create({
    name,
    email,
    password: hashedPassword,
 });

    res.status(201).json({message: "User Generated Succefully",token : generateToken(user._id), user});
 }catch(error){
    res.status(500).json({message: error.message});
 }
}

// login user
const LoginUser = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid email or password"});
        }
        res.status(200).json({message: "User Login Successfully", token : generateToken(user._id),user});
    } catch(error){
        res.status(500).json({message: error.message});
    }
    }
module.exports = {registerUser, LoginUser};