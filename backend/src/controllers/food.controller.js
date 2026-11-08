const foodModel = require('../models/food.model');
const likeModel = require('../models/likes.model');
const saveModel = require('../models/save.model');
const commentModel = require('../models/comment.model')
const storageService = require('../services/storage.services')
const {v4: uuid}= require("uuid")

async function createFood(req,res){
    const fileUploadResult = await storageService.uploadFile(req.file.buffer,uuid())

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })

    res.status(201).json({
        message:"Food Item Created",
        food: foodItem
    })
}

async function getFoodItems(req,res){
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message:"Food items fetched successfully",
        foodItems
    })
}

async function likeFood(req,res){
    const {foodId} = req.body;

    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLiked){
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId,{
        $inc: {likeCount: -1}
    })

        return res.status(200).json({
            message:"Unliked"
        })
    }



    const like = await likeModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId,{
        $inc: {likeCount: 1}
    })

    res.status(201).json({
        message:"Liked",
        like
    })
}

async function saveFood(req,res){
    const {foodId} = req.body;

    

    const user = req.user;



    const isAlreadyLiked = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLiked){
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId,{
        $inc: {saveCount: -1}
    })

        return res.status(200).json({
            message:"Unsaved"
        })
    }



    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId,{
        $inc: {saveCount: 1}
    })

    res.status(201).json({
        message:"Saved",
        save
    })
}

async function getSavedFood(req,res){
    const user = req.user;

    const savedFoods= await saveModel.find({user: user._id}).populate('food');

    if (!savedFoods || savedFoods.length === 0){
        return res.status(404).json({
            message:"No saved foods found"
        });
    }

    res.status(200).json({
        message:"saved Foods retrived successfully",
            savedFoods
        
    })
}

async function commentOnFood(req,res){
    const {foodId, comment: commentText} = req.body;
    const user = req.user;

    const comment = await commentModel.create({
        user: user._id,
        food: foodId,
        comment: commentText
    })

    await foodModel.findByIdAndUpdate(foodId,{
        $inc: {commentCount: 1}
    })

    res.status(201).json({
        message:"Commented",
        comment
    })
}

async function getComments(req,res){
    const user = req.user;
    const foodId= req.query.foodId;

    const comments = await commentModel.find({food:foodId}).populate('user')

    if(!comments || comments.length === 0){
        return res.status(404).json({
            message:"No comments found"
        });        
    }

    res.status(200).json({
        message:"Comments retrived successfully",
            comments
        
    })
}

async function getMyFoods(req,res){
    const foodPartnerId = req.foodPartner._id;

    const foods = await foodModel.find({foodPartner:foodPartnerId})

    if(!foods || foods.length===0){
        return res.status(404).json({
            message:"You have no foods",
        })
    }

    res.status(200).json({
        message:"All you foods retrived",
        foods
    })
}


module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSavedFood,
    commentOnFood,
    getComments,
    getMyFoods
}
