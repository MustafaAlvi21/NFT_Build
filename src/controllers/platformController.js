const mongoose = require('mongoose');

// QUERY SERVICES
const { createPlatformService, getPlatformService, countPlatformService, updatePlatformService } = require('../services/platform-services');

// HELPERS UTILITY FUNCTIONS
const { validateAll } = require('../utils/validate');


const getPlatform = async (req, res) => {

    try {
        const data = await getPlatformService();
        return res.json({ success: true, message: data })

    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error })
    }


}


const createPlatform = async (req, res) => {

    const platformData = {
        comissionLevels: req.body.comissionLevels,
    }


    try {
        validateAll(platformData.comissionLevels, 'Comission Levels')


        const platformCount = await countPlatformService()

        if (platformCount == 1) throw "Platform Arleady Exists"

        await createPlatformService(platformData)

        response = { success: true, message: "Platform Created Successfully" }



        return res.json(response)

    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error })
    }
}


const updatePlatform = async (req, res) => {
    try {

        const data = req.body;

        validateAll(data.plisioKey, null, "Plisio key is required")


        const result = await updatePlatformService({}, {
            plisioKey: data.plisioKey
        })
        console.log(result);

        if ((result.matchedCount >= 1 && result.modifiedCount >= 1) || (result.upsertedCount >= 1)) return res.json({ success: true, message: "Platform update" })
        else return res.status(400).json({ success: false, message: "Error in updating Platform" })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error })
    }

}


module.exports = {
    getPlatform,
    createPlatform,
    updatePlatform
}