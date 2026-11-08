const userModel = require('../models/user.model')
const foodPartnerModel = require('../models/foodpartner.model')
const {validationResult}=require('express-validator')
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')

const tokenCookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000
}

async function registerUser(req,res){
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
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

    const userToken = jwt.sign({
        _id:user._id,
        role: 'user'
    },process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie("userToken",userToken, tokenCookieOptions,{
    httpOnly: true,
    secure: true,
    sameSite: "none"
    })

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

    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
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

    const userToken = jwt.sign({
        _id:user._id,
        role: 'user'
    },process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie("userToken",userToken, tokenCookieOptions,{
            httpOnly: true,
    secure: true,
    sameSite: "none"}
    )

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

    res.clearCookie("userToken", tokenCookieOptions);
    res.clearCookie("token", tokenCookieOptions);
    res.status(200).json({
        message:"User logged out Successfully"
    })
}

async function registerFoodPartner(req,res){
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
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

    const foodPartnerToken = jwt.sign({
        _id:user._id,
        role: 'foodPartner'
    },process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie("foodPartnerToken",foodPartnerToken, tokenCookieOptions,
        {
            httpOnly: true,
    secure: true,
    sameSite: "none"}
    )

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
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {email,password}=req.body;

    const foodPartner= await foodPartnerModel.findOne({email})

    if (!foodPartner){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const pwdmatch = await bcrypt.compare(password,foodPartner.password);

    if (!pwdmatch){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const foodPartnerToken = jwt.sign({
        _id:foodPartner._id,
        role: 'foodPartner'
    },process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie("foodPartnerToken",foodPartnerToken, tokenCookieOptions,
        {
            httpOnly: true,
    secure: true,
    sameSite: "none"}
    )

    res.status(200).json({
        message:"FoodPartner Logged In Successfully",
        foodPartner:{
            id:foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })
}

async function logoutFoodPartner(req,res){
    res.clearCookie("foodPartnerToken", tokenCookieOptions);
    res.clearCookie("token", tokenCookieOptions);
    res.status(200).json({
        message:"FoodPartner logged out Successfully"
    })    
}

async function getUserData(req,res){
    const user = req.user;

    res.status(201).json({
        message:"User data retrived",
        role:'user',
        user
    })

}

async function getFoodPartnerData(req,res){
    const foodPartner=req.foodPartner;

    res.status(201).json({
        message:"FoodPartner Data retrived",
        role:'foodPartner',
        foodPartner
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
    getUserData,
    getFoodPartnerData
}
