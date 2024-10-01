const mongoose = require('mongoose');


const comissionLevel = mongoose.Schema({
    index: { type: Number, required: true },
    fees: { type: Number, required: true },
    isActive: { type: Boolean, required: true },
});



module.exports = mongoose.model('comissionLevel', comissionLevel);
