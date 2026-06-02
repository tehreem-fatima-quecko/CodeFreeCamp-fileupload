var express = require('express');
var app = express();
var cors = require('cors');
require('dotenv').config()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const multer = require("multer");
const upload = multer(); // ✅ IMPORTANT: no dest, no memoryStorage needed

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.json({ error: "No file uploaded" });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
