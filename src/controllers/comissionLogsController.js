// QUERY SERVICES
const { getCommissionLogsService } = require('../services/comission-log-service');
const { validateAll } = require('../utils/validate');


const getCommissionLogs = async (req, res) => {

    const userID = req.query.userID;

    try {

        validateAll(userID, 'User ID')

        const data = await getCommissionLogsService({ userID: userID });
        return res.json({ success: true, message: data })

    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error })
    }


}

module.exports = {
    getCommissionLogs,
}