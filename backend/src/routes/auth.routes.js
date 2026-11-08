const express=require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware= require('../middlewares/auth.middleware');

const {body, validationResult} = require("express-validator");

const router = express.Router();

// user auth APIs
router.post('/user/register',
    [
    body("fullName")
        .notEmpty().withMessage("Name is required")
        .isLength({min: 4, max: 25}).withMessage("Name must be within within 4 and 25"), 
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please provide a valid email address"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),  
    ],
    authController.registerUser);
router.post('/user/login',
    [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please provide a valid email address"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),  
    ],
    authController.loginUser);
router.post('/user/logout',authController.logoutUser);
router.get('/user/account',authMiddleware.authUserMiddleware,authController.getUserData)

// foodpartner auth APIs
router.post('/foodPartner/register',
    [
    body("name")
        .notEmpty().withMessage("Name is required")
        .isLength({min: 4, max: 25}).withMessage("Name must be within within 4 and 25"), 
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please provide a valid email address"),
    body("address")
        .notEmpty().withMessage("Address is required")
        .isLength({ min: 5, max: 100 }).withMessage("Address must be between 5 and 100 characters"),
    body("phone")
        .notEmpty().withMessage("Phone number is required")
        .isMobilePhone().withMessage("Please provide a valid phone number"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),  
    ],
    authController.registerFoodPartner)
router.post('/foodPartner/login',
    [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please provide a valid email address"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),  
    ],
    authController.loginFoodPartner)
router.post('/foodPartner/logout',authController.logoutFoodPartner)
router.get('/foodPartner/account',authMiddleware.authFoodPartnerMiddleware,authController.getFoodPartnerData)

module.exports=router;


