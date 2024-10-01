const CommissionLogs = require('../models/comissionLog');

const getCommissionLogsService = async (condition) => {

    try {
        return CommissionLogs.find(condition).sort({ _id: -1 })
    } catch (error) {
        console.error(error);
        throw error
    }
}

const createCommissionLogService = async (data) => {
    try {
        
        return new CommissionLogs(data).save()

    } catch (error) {
        console.error(error);
        throw error
    }
}



module.exports = {
    createCommissionLogService,
    getCommissionLogsService

}