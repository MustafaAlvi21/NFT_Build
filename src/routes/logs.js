const express = require('express');
const router = express.Router();

// controller
const { getCommissionLogs, getMyPaymentLogs } = require('../controllers/comissionLogsController');
const { decryptUser } = require('../middleware/decryptUser');



router.get('/', getCommissionLogs)

router.get('/payment-logs', decryptUser, getMyPaymentLogs)

// router.post('/buy-package', decryptUser, buyPackage)



module.exports = router