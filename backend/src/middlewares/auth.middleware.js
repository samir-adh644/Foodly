const foodPartnerModel = require('../models/foodpartner.model')
const userModel = require('../models/user.model')

const jwt = require('jsonwebtoken')


async function authFoodPartnerMiddleware(req, res, next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized access"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)


        const foodPartner = await foodPartnerModel.findById(decoded._id);
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


        // User tokens created by older login/register handlers use `id`,
        // while newer tokens may use `_id`.
        const user = await userModel.findById(decoded._id || decoded.id);

        if (!user) {
            return res.status(401).json({
            message: "User not found. Please login again."
        });
            }

            req.user = user;

            next()
        
    }catch (err){
        return res.status(401).json({
            message:"Invalid Token",
            user: true
        })
    }
    
}
module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}
