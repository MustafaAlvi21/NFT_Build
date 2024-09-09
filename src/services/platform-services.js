const Platform = require('../models/platform')




const getPlatformService = async () => {

    try {
        return Platform.findOne()

    } catch (error) {
        console.error(error);
        throw error
    }
}

const createPlatformService = async (data) => {
    try {
        return new Platform(data).save()

    } catch (error) {
        console.error(error);
        throw error
    }
}

const countPlatformService = async () => {

    try {
        return Platform.countDocuments()
    } catch (error) {
        throw error
    }
}

const updatePlatformService = async (query = undefined, payload = undefined) => {
    try {
        console.log("query", query);
        console.log("payload", payload);
        return Platform.updateOne(query, payload, { upsert: true }).exec()

    } catch (error) {
        console.error(error);
        throw error
    }
}



module.exports = {
    createPlatformService,
    getPlatformService,
    countPlatformService,
    updatePlatformService
}