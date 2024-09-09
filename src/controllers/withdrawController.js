const mongoose = require('mongoose');

// QUERY SERVICES
const { createWithdrawService, getWithdrawService, updateWithdrawService } = require('../services/withdraw-services');
const { getSingleUserService, updateUserService } = require('../services/user-services');

// HELPERS UTILITY FUNCTIONS
const { validateAll } = require('../utils/validate');


const getAllWithdraw = async (req, res) => {

    let query = {}

    if (req.query.status) {
        query = { ...query, "details.status": req.query.status }
    }
    if (req.query.walletAddress) {
        query = { ...query, "details.walletAddress": req.query.walletAddress }
    }

    try {
        const data = await getWithdrawService({ action: "withdraw", ...query });
        return res.json({ success: true, message: data })

    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error })
    }

}


const createWithdraw = async (req, res) => {

    const withdrawData = {
        amount: req.body.amount,
        crypto: req.body.crypto
    }

    const walletAddress = req.user.walletAddress;
    const userID = req.user._id


    try {
        validateAll(withdrawData.amount, 'Amount')


        const user = await getSingleUserService({ walletAddress: walletAddress });
        validateAll(user, null, "User Not Found")

        if (withdrawData.amount > user.comission) throw "Insufficient Comission Amount"

        await createWithdrawService({ userID, action: 'withdraw', details: { walletAddress, status: 'pending', ...withdrawData } })

        response = { success: true, message: "Withdrawal Requested!" }



        return res.json(response)

    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error })
    }
}
const acceptWithdraw = async (req, res) => {

    const withdrawData = {
        _id: req.body._id
    }


    try {
        validateAll(withdrawData._id, '_id')

        let data = await getWithdrawService({ _id: withdrawData._id });
        data = data[0]


        const user = await getSingleUserService({ _id: data.userID });

        if (data.details.amount > user.comission) throw "User Have Insufficient Comission Amount"

        await updateWithdrawService({ _id: withdrawData._id }, { $set: { "details.status": 'withdrawn' } })

        await updateUserService({ _id: user._id }, { $inc: { comission: -data.details.amount } });


        response = { success: true, message: "Withdrawal Requested Accepted!" }



        return res.json(response)

    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error })
    }
}

const rejectWithdraw = async (req, res) => {

    const withdrawData = {
        _id: req.body._id,
        userID: req.body.userID
    }


    try {
        validateAll(withdrawData._id, '_id')

        console.log(withdrawData.userID, "==============================================");

        let data = await getWithdrawService({ _id: withdrawData._id });
        data = data[0]

        if (withdrawData.userID) {
            await updateWithdrawService({ _id: withdrawData._id }, { $set: { "details.status": 'cancelled' } })
        } else {
            await updateWithdrawService({ _id: withdrawData._id }, { $set: { "details.status": 'rejected' } })
        }




        response = { success: true, message: withdrawData.userID && withdrawData.userID.length > 0 ? "Withdrawal Request Cancelled!" : "Withdrawal Request Rejected!" }



        return res.json(response)

    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error })
    }
}




module.exports = {
    createWithdraw,
    getAllWithdraw,
    acceptWithdraw,
    rejectWithdraw
}