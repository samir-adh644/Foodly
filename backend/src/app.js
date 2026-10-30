const express = require('express')
const cookieParser = require('cookie-parser');

// routes import start
const authRoutes=require('./routes/auth.routes')
const foodRoutes = require('./routes/food.routes')
// routes import end

const app = express()

// Useful things start
app.use(express.json());
// app.use(express.urlencoded())
app.use(cookieParser());

// Useful things end





// using routes start
app.use('/api/auth',authRoutes)
app.use('/api/food',foodRoutes)
// using routes end

module.exports=app;