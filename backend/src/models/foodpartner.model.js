const mongoose = require('mongoose');

const foodPartnerSchemea = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const foodPartnerModel = mongoose.model('foodpartner',foodPartnerSchemea)

module.exports = foodPartnerModel;