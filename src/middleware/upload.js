const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Tên thư mục trên Cloudinary
        allowed_formats: ['jpg', 'png'],
    },
});

const upload = multer({ storage: storage });

module.exports = upload;