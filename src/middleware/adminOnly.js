// CONFIG
const { secretKey } = require('../config/config')

// PACKAGES
const CryptoJS = require("crypto-js");

const decryptAdmin = (req, res, next) => {

    try {
        const token = req.headers['pk2']

        if (!token || token.length == 0) throw "Authentication Failed"
        else {
            const decryptedToken = CryptoJS.AES.decrypt(decodeURIComponent(token), secretKey);
            var actualData = decryptedToken.toString(CryptoJS.enc.Utf8);

            if (actualData == "") throw "Invalid token";
            
            const data = JSON.parse(actualData)
            if (data.role != "admin") throw "Only admin can access"
            req.user = data

            return next()
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error })
    }
}


module.exports = {
    decryptAdmin
}