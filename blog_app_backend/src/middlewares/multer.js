const path = require('path')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');

const DIR = path.join(__dirname, '../../../blog_app_frontend/public/blog-post-images');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

const upload = multer({ storage: storage, });

module.exports = {
    upload
}