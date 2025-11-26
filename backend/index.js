const express = require('express');
const multer = require('multer');
const docxConverter = require('docx-pdf');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());

//setting up the file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })
app.post('/convertfile', upload.single('file'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  try {
    if (!req.file) {
      res.status(400).send('No file uploaded.');
      return;
    }
    //defining output file path
    let output = path.join(__dirname, 'files', `${req.file.originalname}_output.pdf`);
    docxConverter(req.file.path,output,function(err,result){
    if(err){
        console.log(err);
        return res.status(500).send('Conversion failed.');
    }
    res.download(output,()=>{
        alert('File downloaded successfully');
    })
    console.log('result'+result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred during the file upload or conversion.');
  }
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});