const express = require('express');
const router = express.Router();

// MIDDLEWARES
const { authenticateWalletAddress } = require('../middleware/authenticate');
const { decryptUser } = require('../middleware/decryptUser');

// CONTROLLERS
const { authenticateUser, getUser, updateUser, getLoginUser, getAdminReferralCode } = require('../controllers/userController');

router.get('/', getUser)

router.get('/get-loggedin-user', decryptUser, getLoginUser)

router.post('/authenticate-user', authenticateWalletAddress, authenticateUser)

router.patch('/', updateUser)


// Admin Area
router.get('/get-admin-referral', getAdminReferralCode)


module.exports = router