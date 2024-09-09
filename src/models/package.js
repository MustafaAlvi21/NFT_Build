const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
    _id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stockQty: { type: Number, required: true },
    description: { type: String, required: true },
    URI: { type: String, required: true },




    //new work 
    nftPdf: { type: String, required: false },
    image: { type: String, required: false },
    pacakgeURI: { type: String, required: false },
    uniqueId: { type: String, required: false },
    showQty: { type: Boolean,default:false, required: true },

    timestamp: { type: Number, default: Date.now },
    dateTime: { type: Date, default: Date.now },
   
});



module.exports = mongoose.model('Packages', packageSchema);