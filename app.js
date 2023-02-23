const express=require('express');

const multer=require('multer');
const app=express();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./images"); //important this is a direct path fron our current file to storage location
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });
const upload = multer({ storage: fileStorageEngine });

app.post('/single',upload.single('image'),(req,res)=>{
    console.log(`${req.file.destination}/${req.file.filename} `);
    res.send('file uploaded successfully')
});  


// Multiple Files Route Handler
app.post("/multiple", upload.array("images", 3), (req, res) => {
    console.log(req.files);
    res.send("Multiple Files Upload Success");
  });


  
app.listen(3000,()=>{console.log('server is running on 3000 better catch it')})
