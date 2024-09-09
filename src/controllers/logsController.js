const mongoose = require('mongoose');

// QUERY SERVICES
const { getLogsService } = require('../services/log-services');


const getLogs = async (req, res) => {

    try {
        const data = await getLogsService();
        return res.json({ success: true, message: data })

    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error })
    }


}

module.exports = {
    getLogs,
}