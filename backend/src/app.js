const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors');

// routes import start
const authRoutes=require('./routes/auth.routes')
const foodRoutes = require('./routes/food.routes')
const foodPartnerRoutes = require('./routes/foodPartner.routes')
// routes import end

const app = express()

// Useful things start
app.use(express.json());
// app.use(express.urlencoded())
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL?.replace(/\/$/, ''),
    credentials: true
}));

// Useful things end





// using routes start
app.use('/api/auth',authRoutes)
app.use('/api/food',foodRoutes)
app.use('/api/foodPartner',foodPartnerRoutes)
// using routes end

module.exports=app;
