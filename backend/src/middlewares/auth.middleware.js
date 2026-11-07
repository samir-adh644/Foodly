const foodPartnerModel = require('../models/foodpartner.model')
const userModel = require('../models/user.model')

const jwt = require('jsonwebtoken')


async function authFoodPartnerMiddleware(req, res, next){
    const token = req.cookies.token;
    if(!token){
        res.status(401).json({
            message:"Unauthorized access"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)

        const foodPartner = await foodPartnerModel.findById(decoded.id);
        if (!foodPartner) {
            return res.status(401).json({
                message: "Food partner not found"
            });
        }

        

        req.foodPartner = foodPartner;
        

        next()
    }catch (err){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }

}


async function authUserMiddleware(req,res,next){
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Unauthorized access"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await userModel.findById(decoded._id);

        req.user = user;

        
    }catch (err){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
    next()
}
module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}
