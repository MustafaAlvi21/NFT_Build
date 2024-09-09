// QUERY SERVICES
const { getSingleUserService, getUsersService, createUserService, updateUserService } = require('../services/user-services')
const { createLogService } = require('../services/log-services');

// HELPER FUNCTIONS / UTILITIES
const { validateAll } = require('../utils/validate');
const { encryptUser } = require('../utils/encryptUser');

// SHORT UNIQUE ID GENERATOR PACKAGE
const ShortUniqueId = require('short-unique-id');



const { ethers } = require("ethers");
const { SignMessage } = require('../config/config');


const getUser = async (req, res) => {

    try {
        const data = await getUsersService();
        return res.json({ success: true, message: data })

    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error })
    }


}


const getLoginUser = async (req, res) => {

    try {
        const data = await getSingleUserService({ _id: req.user._id });
        return res.json({ success: true, message: data })

    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error })
    }


}



const authenticateUser = async (req, res) => {
    const message = SignMessage;
    const userData = {
        walletAddress: req.body.walletAddress,
        sign: req.body.sign,
    }

    try {
        validateAll(userData.walletAddress, 'Wallet Address')

        // console.log(ethers);

        const signerAddress = ethers.verifyMessage(message, userData.sign);
        if (signerAddress.toLowerCase() === userData.walletAddress.toLowerCase()) {

            console.log("Signature verified");

            // Normalize to lowercase
            const normalizedAddress = ethers.getAddress(userData.walletAddress);

            const alreadyExist = await getSingleUserService({ walletAddress: normalizedAddress });
            console.log("alreadyExist", alreadyExist);

            if (alreadyExist == null) throw "You Need To Buy NFT To Get Access"

            if (alreadyExist.role == "user") validateAll(alreadyExist.NFTs, null, "You Need To Buy NFT To Get Access")

            const token = encryptUser(alreadyExist);
            await createLogService({ userID: alreadyExist._id, action: 'login', details: { walletAddress: normalizedAddress } })

            return res.json({ success: true, message: "Login Sucessfull!", token, user: alreadyExist })

        } else {
            console.log("Signature  NOT  verified");
            throw "Invalid signature"
        }

    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error })
    }
}

// const authenticateUser = async (req, res) => {

//     const uid = new ShortUniqueId({ length: 7 });
//     const userData = {
//         walletAddress: req.body.walletAddress,
//         // name: req.body.name,
//         // age: req.body.age
//         referralCode: uid.rnd(),

//     }

//     const referredBy = req.body.referredBy;


//     try {
//         validateAll(userData.walletAddress, 'Wallet Address')
//         // validateAll(userData.name, 'Name')
//         // validateAll(userData.age, 'Age')


//         const alreadyExist = await getSingleUserService({ walletAddress: userData.walletAddress });
//         let response = {};
//         let j = 0;

//         if (alreadyExist) {
//             const token = encryptUser(alreadyExist);

//             await createLogService({ userID: alreadyExist._id, action: 'login', details: { walletAddress: userData.walletAddress } })


//             response = {
//                 success: true,
//                 message: "Login Sucessfull!",
//                 token,
//                 user: alreadyExist
//             }
//         } else {

//             let sponsor;

//             if (referredBy) {
//                 sponsor = await getSingleUserService({ referralCode: referredBy });

//                 validateAll(sponsor, null, "Invalid Referral Code")

//                 userData.referredBy = [{ sponsorID: sponsor._id.toString() }]

//                 if (sponsor.referredBy.length > 0) {
//                     userData.referredBy = [...userData.referredBy, ...sponsor.referredBy]
//                 }

//             }

//             const createdUser = await createUserService(userData)
//             const token = encryptUser(createdUser);

//             if (sponsor) {
//                 sponsor.referredTo = [{ _id: createdUser._id.toString() }, ...sponsor.referredTo]

//                 await updateUserService({ _id: sponsor._id }, sponsor)
//             }

//             await createLogService({ userID: createdUser._id, action: 'register', details: { walletAddress: userData.walletAddress } })

//             response = { success: true, message: "Registration Successfull", token, user: createdUser }
//         }


//         return res.json(response)



//     } catch (error) {
//         console.error(error);
//         return res.status(400).json({ success: false, message: error })
//     }
// }

const updateUser = async (req, res) => {
    const userData = {
        _id: req.body._id,
        name: req.body.name,
        walletAddress: req.body.walletAddress,
    }

    try {
        const data = await updateUserService({ _id: userData._id }, { name: userData.name });
        return res.json({ success: true, message: data })
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error })
    }
}


const getAdminReferralCode = async (req, res) => {
    try {
        const result = await getSingleUserService({ role: "admin" })
        if (result) return res.json({ success: true, message: result?.referralCode })
        else return res.json({ success: true, message: "" })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error })

    }
}



module.exports = {
    getUser,
    authenticateUser,
    updateUser,
    getLoginUser,
    getAdminReferralCode
}