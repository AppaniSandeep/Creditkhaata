const express = require("express");


const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


router.post("/register", async (request,response) => {
    try{
        const {email,password} = request.body;
        const user = new User({email,password});
        await user.save();
        response.status(201).json({message:"User Registered"});
    } catch (error){
        response.status(400).json({err:error.message})
    }
})

router.post("/login", async (request,response) => {
    try{
        const {email,password} = request.body;
        const user = await User.findOne({email});
        if (!user || (!await user.comparePassword(password))){
            return response.status(401).json({error:"Invalid credentials"});
        }
        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:"1d",});
        response.json({token});

    }catch (error){
        response.status(500).json({err:error.message})
    }
})

module.exports = router