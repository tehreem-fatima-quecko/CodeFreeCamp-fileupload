var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config();

var app = express();

var upload = multer({ storage: multer.memoryStorage() });

function getFileMetadata(file) {
  return {
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  };
}

function sendFileMetadata(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json(getFileMetadata(req.file));
}

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post(
  ['/api/fileanalyse', '/api/fileanalyse/', '//api/fileanalyse', '//api/fileanalyse/'],
  upload.single('upfile'),
  sendFileMetadata
);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});