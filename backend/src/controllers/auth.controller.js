const userModel = require('../models/user.model')
const foodPartnerModel = require('../models/foodpartner.model')
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
    },process.env.JWT_SECRET)

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

async function loginUser(req,res){
    const {email,password}=req.body;

    const user= await userModel.findOne({email})

    if (!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const pwdmatch = await bcrypt.compare(password,user.password);

    if (!pwdmatch){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:"User Logged In Successfully",
        user:{
            id:user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}

async function logoutUser(req,res){

    res.clearCookie("token");
    res.status(200).json({
        message:"User logged out Successfully"
    })
}

async function registerFoodPartner(req,res){
        const {name, email,phone, address, password} = req.body;
    const isUserExists = await foodPartnerModel.findOne({email})

    if (isUserExists){
        return res.status(400).json({
            message:"FoodPartner already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await foodPartnerModel.create({
        name,
        email,
        phone,
        address,
        password:hashedPassword
    })

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message:"FoodPartner Registered Successfully",
        user:{
            id:user._id,
            email: user.email,
            name: user.name,
            address: user.address,
            phone: user.phone
        }
    })
}

async function loginFoodPartner(req,res){
    const {email,password}=req.body;

    const user= await foodPartnerModel.findOne({email})

    if (!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const pwdmatch = await bcrypt.compare(password,user.password);

    if (!pwdmatch){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:"FoodPartner Logged In Successfully",
        user:{
            id:user._id,
            email: user.email,
            name: user.name
        }
    })
}

async function logoutFoodPartner(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"FoodPartner logged out Successfully"
    })    
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}