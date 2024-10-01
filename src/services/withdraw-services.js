const Logs = require('../models/logs');
const { logInterface } = require('../utils/logInterface');

const getWithdrawService = async (condition) => {
    try {
        return Logs.find(condition).sort({ _id: -1 })
    } catch (error) {
        console.error(error);
        throw error
    }
}

const createWithdrawService = async (data) => {
    try {
        logInterface(data)
        return new Logs(data).save()

    } catch (error) {
        console.error(error);
        throw error
    }

}
const updateWithdrawService = async (condition, updateData) => {
    try {
        return Logs.findOneAndUpdate(condition, updateData).exec()

    } catch (error) {
        console.error(error);
        throw error
    }
}


// const countWithdrawService = async () => {

//     try {
//         return Withdraw.countDocuments()
//     } catch (error) {
//         throw error
//     }
// }



module.exports = {
    createWithdrawService,
    getWithdrawService,
    updateWithdrawService
}