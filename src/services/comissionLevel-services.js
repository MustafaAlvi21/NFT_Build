const ComissionLevel = require('../models/comissionLevel')

const getComissionLevelService = async (condition) => {

    try {
        return ComissionLevel.find(condition).sort({ index: 1 })
    } catch (error) {
        console.error(error);
        throw error
    }
}

const createComissionLevelService = async (data) => {
    try {
        return new ComissionLevel(data).save()

    } catch (error) {
        console.error(error);
        throw error
    }
}


const countComissionLevelService = async () => {

    try {
        return ComissionLevel.countDocuments()
    } catch (error) {
        throw error
    }
}



module.exports = {
    createComissionLevelService,
    getComissionLevelService,
    countComissionLevelService

}