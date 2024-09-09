const mongoose = require('mongoose');

// QUERY SERVICES
const { getComissionLevelService, createComissionLevelService, countComissionLevelService } = require('../services/comissionLevel-services');

// HELPERS UTILITY FUNCTIONS
const { validateAll } = require('../utils/validate');


const getComissionLevel = async (req, res) => {

    try {
        const data = await getComissionLevelService();
        return res.json({ success: true, message: data })

    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error })
    }


}


const createComissionLevel = async (req, res) => {

    const packageData = {
        fees: req.body.fees,
        isActive: req.body.isActive
    }


    try {
        validateAll(packageData.isActive, 'isActive')
        validateAll(packageData.fees, 'Comission Fees')

        const comissionLevelCount = await countComissionLevelService()

        packageData.index = comissionLevelCount + 1


        console.log(packageData, 'package DATAAAAAAAAAAAAAAAA');

        await createComissionLevelService(packageData)

        response = { success: true, message: "Comission Level Created Successfully" }



        return res.json(response)

    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error })
    }
}



module.exports = {
    getComissionLevel,
    createComissionLevel,
}