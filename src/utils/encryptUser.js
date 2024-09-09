// CONFIG
const { secretKey } = require('../config/config')

// PACKAGES
const CryptoJS = require("crypto-js");

const encryptUser = (data) => {
    try {

        const dataToEncrypt = {
            _id: data._id,
            walletAddress: data.walletAddress,
            role: data.role
        }

        const token = CryptoJS.AES.encrypt(JSON.stringify(dataToEncrypt), secretKey).toString();

        return token;

    } catch (error) {
        throw error
    }

}

module.exports = {
    encryptUser
}
