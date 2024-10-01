const express = require('express');
const router = express.Router();


// controller
const { createComissionLevel, getComissionLevel } = require('../controllers/comissionLevelController')

router.get('/', getComissionLevel)

router.post('/create-comission-level', createComissionLevel)

// router.post('/buy-package', decryptUser, buyPackage)



module.exports = router