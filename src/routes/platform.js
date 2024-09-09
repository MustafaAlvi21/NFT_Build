const express = require('express');
const router = express.Router();


// controller
const { createPlatform, getPlatform, updatePlatform } = require('../controllers/platformController');
const { decryptAdmin } = require('../middleware/adminOnly');



router.get('/get-platform', decryptAdmin, getPlatform)

router.post('/create-platform', decryptAdmin, createPlatform)

router.patch('/update-platform', decryptAdmin, updatePlatform)



module.exports = router