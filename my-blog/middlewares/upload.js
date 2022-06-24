const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const path = require("path");

const storage = multer.diskStorage({
  destination: func1,
  filename: func2,
});

function func1(req, file, cb) {
  cb(null, "./uploads");
}

function func2(req, file, cb) {
  const uniqueSuffix = Date.now();
  const ext = path.extname(file.originalname);
  const name = `${file.fieldname}${uniqueSuffix}${ext}`;
  console.log(name);
  cb(null, name);
}
const upload = multer({ storage });

module.exports = upload;
