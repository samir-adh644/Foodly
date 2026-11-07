const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    food:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food',
        required: true
    },
    comment:{
        type: String,
        default:"Delicious",
        required:true
    },
},    {
        timestamps: true
    })

const commentModel = mongoose.model('comment',commentSchema);
module.exports = commentModel;