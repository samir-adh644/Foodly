const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors');

// routes import start
const authRoutes=require('./routes/auth.routes')
const foodRoutes = require('./routes/food.routes')
// routes import end

const app = express()

// Useful things start
app.use(express.json());
// app.use(express.urlencoded())
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Useful things end





// using routes start
app.use('/api/auth',authRoutes)
app.use('/api/food',foodRoutes)
// using routes end

module.exports=app;