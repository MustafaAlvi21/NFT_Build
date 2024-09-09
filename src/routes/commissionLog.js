const express = require('express');
const router = express.Router();


// controller
const { getCommissionLogs } = require('../controllers/comissionLogsController')

router.get('/', getCommissionLogs)

// router.post('/create-package', createPackage)

// router.post('/buy-package', decryptUser, buyPackage)



module.exports = router