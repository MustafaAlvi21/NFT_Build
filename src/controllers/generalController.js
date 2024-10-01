const GeneralLink = require("../models/general");

const generalGetController = async (req, res) => {
    try {
        const newGeneral = await GeneralLink.findOne();
        res.status(200).json({success: true, data: newGeneral});


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating social links' });
    }

}


const generalUpdateController = async (req, res) => {
    try {
        const socialLinksData = {
            instagram: req.body.instagram,
            twitter: req.body.twitter,
            tiktok: req.body.tiktok,
            youtube: req.body.youtube,
            facebook: req.body.facebook,
        };

        if (typeof req.files.instagramLogo !== "undefined") {
            socialLinksData.instagramLogo = req.files.instagramLogo[0].filename ? req.files.instagramLogo[0].filename : null;    
        }

        if (typeof req.files.twitterLogo !== "undefined") {
            socialLinksData.twitterLogo = req.files.twitterLogo[0].filename ? req.files.twitterLogo[0].filename : null;    
        }

        if (typeof req.files.tiktokLogo !== "undefined") {
            socialLinksData.tiktokLogo = req.files.tiktokLogo[0].filename ? req.files.tiktokLogo[0].filename : null;    
        }

        if (typeof req.files.youtubeLogo !== "undefined") {
            socialLinksData.youtubeLogo = req.files.youtubeLogo[0].filename ? req.files.youtubeLogo[0].filename : null;    
        }

        if (typeof req.files.facebookLogo !== "undefined") {
            socialLinksData.facebookLogo = req.files.facebookLogo[0].filename ? req.files.facebookLogo[0].filename : null;    
        }

        const updatedSocialLink = await GeneralLink.updateOne({}, socialLinksData, { new: true , upsert: true});
        res.json(updatedSocialLink);


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating social links' });
    }
}

module.exports = {
    generalGetController, generalUpdateController
}
