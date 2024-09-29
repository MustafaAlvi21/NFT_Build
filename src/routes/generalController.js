const express = require('express');
const router = express.Router();
const { generalUpdateController, generalGetController } = require('../controllers/generalController')


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



router.get('/get-general', generalGetController)

router.post('/update-social-links', upload.fields([{ name: 'instagramLogo' }, { name: 'twitterLogo' }, { name: 'tiktokLogo' }, { name: 'youtubeLogo' }, { name: 'facebookLogo' }]), generalUpdateController)



// router.post('/social-links', upload.fields([
//     { name: 'instagramLogo', maxCount: 1 },
//     { name: 'twitterLogo', maxCount: 1 },
//     { name: 'tiktokLogo', maxCount: 1 },
//     { name: 'youtubeLogo', maxCount: 1 },
//     { name: 'facebookLogo', maxCount: 1 },

// ]), generalCreateController);

// router.put('/social-links/:id', upload.fields([
//     { name: 'instagramLogo', maxCount: 1 },
//     { name: 'twitterLogo', maxCount: 1 },
//     { name: 'tiktokLogo', maxCount: 1 },
//     { name: 'youtubeLogo', maxCount: 1 },
//     { name: 'facebookLogo', maxCount: 1 },

// ]), generalUpdateController);


// router.post('/create-package', createPackage)
// router.post('/buy-package', decryptUser, buyPackage)


module.exports = router