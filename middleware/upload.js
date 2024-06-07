const multer = require('multer');
const storage = multer.diskStorage({});

const upload = multer({ storage: storage }).array('product', 20); 

module.exports = upload;
