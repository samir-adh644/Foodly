const userModel = require('../models/user.model')
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registerUser(req,res){
    const {fullName, email, password} = req.body;
    const isUserExists = await userModel.findOne({email})

    if (isUserExists){
        return res.status(400).json({
            message:"User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password:hashedPassword
    })

    const token = jwt.sign({
        id:user._id,
    },"mySecret")

    res.cookie("token",token)

    res.status(201).json({
        message:"User Registered Successfully",
        user:{
            id:user._id,
            email: user.email,
            fullName: user.fullName
        }
    })


}

module.exports = {registerUser}