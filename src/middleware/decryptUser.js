// CONFIG
const { secretKey } = require('../config/config')

// PACKAGES
const CryptoJS = require("crypto-js");

const decryptUser = (req, res, next) => {

    const token = req.headers['pk2']

    if (!token && token.length == 0) {
        return res.status(400).json({ success: false, message: 'Authentication Failed' })
    }

    else {
        const decryptedToken = CryptoJS.AES.decrypt(decodeURIComponent(token), secretKey);
        var actualData = decryptedToken.toString(CryptoJS.enc.Utf8);

        if (actualData == "") throw "Invalid token";

        req.user = JSON.parse(actualData)

        return next()
    }




}

module.exports = {
    decryptUser
}