const multer = require("multer");
//define storage for the images
const storage = multer.diskStorage({
    //destination for files
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
  
    //add back the extension
    filename: function (req, file, cb) {
        
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  //upload parameters for multer
  const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        if(
            file.mimetype == "application/doc" ||
            file.mimetype == "application/docx" ||
            file.mimetype == "application/pdf" 

        ){
            cb(null, true)
        } else {
            throw new Error("Only doc, docx, pdf files are supported")
        }
    },
    limits: {
      fieldSize: 1024 * 1024 * 3,
    },
  })

module.exports = upload;