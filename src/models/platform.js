const mongoose = require('mongoose');

const platform = mongoose.Schema({
    comissionLevels: { type: Number, required: false },
    plisioKey: { type: String, required: false },
});



module.exports = mongoose.model('platform', platform);