const express=require('express');
var multer  = require('multer');
var path=require('path');
var bodyParser=require('body-parser')
// var upload = multer({ dest: __dirname+'/uploads' })
const app=express();

var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.use('/uploads',express.static('uploads'))
//set views-
app.set('view engine','ejs');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+
path.extname(file.originalname));

  }
})

var upload = multer({ storage: storage }).single('files')

app.post('/profile', urlencodedParser, function (req, res, next) {
  upload(req,res,function(err){
    if(err){
      console.log(err);
    }else{
      console.log(req.file);
      res.render('notes',{fileName:req.file.filename,path:req.file.path,name:req.body.subject,year:req.body.year,description:req.body.description});
    }
  })

})

///Listen to the port.
app.listen(3000,function(){
  console.log('Listening to port 3000');
})
