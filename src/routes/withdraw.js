const express = require('express');
const router = express.Router();

// controller
const { createWithdraw, getAllWithdraw, acceptWithdraw, rejectWithdraw } = require('../controllers/withdrawController');

// Middleware
const { decryptUser } = require('../middleware/decryptUser');
const { authenticateWalletAddress } = require('../middleware/authenticate');


router.get('/', getAllWithdraw)
router.post('/withdraw-comission', decryptUser, authenticateWalletAddress, createWithdraw)
router.patch('/accept-request', acceptWithdraw)
router.patch('/reject-request', rejectWithdraw)



module.exports = router