const multer = require('multer');
const path = require('path');

const imagestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/home/swati/keval/newtut/MERN/backend/uploadedimages');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const adminImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/profile/admin/'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '.' + file.originalname);
    }
})

const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/products/'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '.' + file.originalname);
    }
})

const imageupload = multer({
    storage: imagestorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .jpeg and .png format allowed!'));
        }
    }
})

const saveAdminProfilePic = multer({
    storage: adminImageStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only.jpeg and.png format allowed!'));
        }
    }
})

const productImageHandler = multer({
    storage: productStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only.jpeg and.png format allowed!'));
        }
    }
})

module.exports = { imageupload, imagestorage, saveAdminProfilePic, productImageHandler };