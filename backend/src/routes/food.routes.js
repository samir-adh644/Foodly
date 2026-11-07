const express = require('express')
const foodController = require('../controllers/food.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router();
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
})


router.post('/',authMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),
    foodController.createFood)

router.get("/",authMiddleware.authUserMiddleware,foodController.getFoodItems)

router.post("/like",authMiddleware.authUserMiddleware,foodController.likeFood)

router.post("/save",authMiddleware.authUserMiddleware,foodController.saveFood)

router.get("/savedFoods",authMiddleware.authUserMiddleware,foodController.getSavedFood)

router.post("/comment",authMiddleware.authUserMiddleware,foodController.commentOnFood)

module.exports = router;