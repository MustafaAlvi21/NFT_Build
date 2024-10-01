const express = require('express');
const router = express.Router();

// MIDDLEWARES
const { decryptUser } = require('../middleware/decryptUser');

// CONTROLLERS
const { getTeamMembersRevenueEarnings,revenueCalculations } = require('../controllers/teamMembersRevenueEarningsController');


router.get('/get-team', decryptUser, getTeamMembersRevenueEarnings)
router.get('/get-teamRevenue', decryptUser, revenueCalculations)


// router.delete('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'Handling DELETE request /users',
//         success: true
//     })
// })


// router.get('/:userID', (req, res, next) => {
//     const id = req.params.userID;
//     if (id) {
//         res.status(200).json({
//             message: 'You got this user!',
//             success: true,
//             id: id
//         })
//     } else {
//         res.status(200).json({
//             message: 'You failed LOL',
//             success: 'false'
//         })
//     }
// })

// router.post('/:userID', (req, res, next) => {
//     const id = req.params.userID;
//     if (id) {
//         res.status(200).json({
//             message: 'You got added this user!',
//             success: true,
//             id: id
//         })
//     } else {
//         res.status(200).json({
//             message: 'You failed LOL',
//             success: 'false'
//         })
//     }
// })



module.exports = router