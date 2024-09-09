const express = require('express');
const router = express.Router();


const multer = require('multer');
const path = require('path');
const fs = require('fs');





const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '../../../uploads');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      cb(null, dir);
    //   cb(null);
    },
    filename: (req, file, cb) => {
    //   cb(null, `${Date.now()}-${file.originalname}`);
      const sanitizedFilename = file.originalname.replace(/\s+/g, '_');
    cb(null, `${Date.now()}-${sanitizedFilename}`);
    },
  });





const upload = multer({ storage });





// middleware
const { authenticateWalletAddress } = require('../middleware/authenticate');

// controller
const { createPackage, getPackages, buyPackage, verifyUser, createInvoice,fetchdepositLogs, plisioWebhook, editPackage, getSinglePackage,NFTmetadata } = require('../controllers/packageController');

router.get('/get-packages', getPackages)

router.get('/get-single-package', getSinglePackage)

router.post('/create-package',upload.fields([{ name: 'pdfFile' }, { name: 'imageFile' }]), createPackage)

router.patch('/edit-package',upload.fields([{ name: 'pdfFile' }, { name: 'imageFile' }]), editPackage)

router.post('/verify-user', authenticateWalletAddress, verifyUser)

router.post('/buy-package', authenticateWalletAddress, createInvoice)

router.post('/plisio-webhook', plisioWebhook)

router.get('/metadata/:uniqueId', NFTmetadata)

router.get('/fetchdepositLogs', fetchdepositLogs)


module.exports = router
