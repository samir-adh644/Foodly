const express=require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// user auth APIs
router.post('/user/register',authController.registerUser);
router.post('/user/login',authController.loginUser);
router.post('/user/logout',authController.logoutUser);

// foodpartner auth APIs
router.post('/foodPartner/register',authController.registerFoodPartner)
router.post('/foodPartner/login',authController.loginFoodPartner)
router.post('/foodPartner/logout',authController.logoutFoodPartner)

module.exports=router;


