import {User} from '../models/user.model.js';

const registerUser = async(req,res)=>{
    try {
        const {username,email,password}=req.body || {};

        //basic validation
        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        //check if user already exists
        const existing=await User.findOne({email:email.toLowerCase()});
        if(existing){
            return res.status(409).json({message:"User with this email already exists!!"})
        }

        const user=await User.create({
            username,
            email:email.toLowerCase(),
            password,
            loggedIn:false,
        });
        res.status(201).json({
        message:"User registered successfully",
        userId:user._id,email:user.email,username:user.username
    })
        
    } catch (error) {
        console.error("Register Error:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({message: error.message});
        }
        return res.status(500).json({message: "Internal server error"});
    }
}

const loginUser=async(req,res)=>{
    try {
        //checking if the user already exits
        const {email,password}=req.body || {};
        const user=await User.findOne({email:email.toLowerCase()});
        if(!user){
            return res.status(404).json({message:"User not found!!"})
        }

        //checking if the passwrod is correct
        const isMatch=await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials!!"})
        }
        
        res.status(200).json({
            message:"Login successful",
            userId:user._id,email:user.email,username:user.username
        })

        
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

const logoutuser=async(req,res)=>{
    try {

        const {email}=req.body;
        const user=await User.findOne({email:email.toLowerCase()})
        if(!user) return res.status(404).json({message:"User not found!!"})
        res.status(200).json({message:"Logout successful"})
        
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export {registerUser,loginUser,logoutuser};