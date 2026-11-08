const foodPartnerModel = require('../models/foodpartner.model')
const userModel = require('../models/user.model')

const jwt = require('jsonwebtoken')


async function authFoodPartnerMiddleware(req, res, next){
    // `token` is kept as a fallback for sessions created before tokens were
    // separated by account type.
    const token = req.cookies.foodPartnerToken || req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized access"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if (decoded.role && decoded.role !== 'foodPartner') {
            return res.status(403).json({
                message: "Food partner access required"
            });
        }

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
    // `token` is kept as a fallback for sessions created before tokens were
    // separated by account type.
    const token = req.cookies.userToken || req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Unauthorized access"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if (decoded.role && decoded.role !== 'user') {
            return res.status(403).json({
                message: "User access required"
            });
        }

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
