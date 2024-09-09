const mongoose = require('mongoose');

const logsSchema = mongoose.Schema({
    userID: {type: String},
    timestamp: { type: Number, default: Date.now },
    dateTime: { type: Date, default: Date.now },
    action: { type: String, enum: ['buy', 'sell', 'deposit', 'withdraw', 'login', 'register'], required: true },
    details: {type: Object, required: false},
});



module.exports = mongoose.model('logs', logsSchema);