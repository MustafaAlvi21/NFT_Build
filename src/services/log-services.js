const Logs = require('../models/logs');
const { logInterface } = require('../utils/logInterface');
const { validateAll } = require('../utils/validate')


const createLogService = async (data) => {
    try {
        logInterface(data)

        return new Logs(data).save()

    } catch (error) {
        console.error(error);
        throw error
    }
}


const getLogsService = async (data={}) => {    
    try {
        return Logs.find(data)
        
    } catch (error) {
        console.error(error);
        throw error
    }
}


const getLatestDepositLog = async () => {

    try {
        return Logs.findOne({ action: "deposit" }).sort({ _id: -1 })

    } catch (error) {
        console.error(error);
        throw error
    }
}


const updateDepositLog = async (query=undefined, payload=undefined) => {

    try {
        return Logs.updateOne(query, payload).exec()

    } catch (error) {
        console.error(error);
        throw error
    }
}


module.exports = {
    createLogService,
    getLogsService,
    getLatestDepositLog,
    updateDepositLog
}