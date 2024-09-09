const mongoose = require('mongoose');

const commissionlogsSchema = mongoose.Schema({
    userID: { type: String, required: true },
    affiliateID: { type: String, required: true },
    affiliateWalletAddress: { type: String, required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Number, default: Date.now },
    dateTime: { type: Date, default: Date.now },
});



module.exports = mongoose.model('commissionLogs', commissionlogsSchema);