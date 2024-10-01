const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // name: { type: String, required: true },
    // age: { type: Number, required: true },
    walletAddress: { type: String, required: true},
    NFTs: { type: Array, required: false},
    referralCode: {type: String, required: true},
    referredTo: {type: Array, required: false, ref: "Users"},
    referredBy: {type: Array, required: false},
    comission: {type: Number, required: false, default : 0},
    totalComission: {type: Number, required: false, default : 0},
    totalInvestment: {type: Number, required: false, default : 0},
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
});



module.exports = mongoose.model('Users', userSchema);