const mongoose = require('mongoose');

const GeneralLinkSchema = new mongoose.Schema({
    instagram: { type: String },
    twitter: { type: String },
    tiktok: { type: String },
    youtube: { type: String },
    facebook: { type: String },
    instagramLogo: { type: String },
    twitterLogo: { type: String },
    tiktokLogo: { type: String },
    youtubeLogo: { type: String },
    facebookLogo: { type: String },
}, { timestamps: true });

const GeneralLink = mongoose.model('generals', GeneralLinkSchema);

module.exports = GeneralLink;