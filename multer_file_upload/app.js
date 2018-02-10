const express = require('express');
var multer = require('multer');
var path = require('path');
var bodyParser = require('body-parser')
var upload = multer({ dest: __dirname + '/uploads' })
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb://multer:multer@ds231758.mlab.com:31758/multer', () => {
    console.log('connected to database');
})

///loading the models

const Notes = require('./models/notes');

var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'))
    //set views-
app.set('view engine', 'ejs');


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));

    }
})

var upload = multer({ storage: storage }).single('files')

app.post('/profile', urlencodedParser, function(req, res, next) {
    upload(req, res, function(err) {
        if (err) {
            console.log(err);
        } else {
            ///save into database
            const newNote = {
                filename: req.file.filename,
                path: req.file.path,
                year: req.body.year,
                name: req.body.name,
                description: req.body.description
            }
            new Notes(newNote)
                .save()
                .then(data => {
                    console.log(data);
                    res.render('files', { fileName: req.file.filename, path: req.file.path, name: req.body.subject, year: req.body.year, description: req.body.description });
                }).catch((error) => {
                    console.log(error);
                })

        }
    })

})

app.get('/notes', function(req, res) {
    //get the data from mongodb and show it to the view
    Notes.find({}, function(err, data) {
        ///get the data send it to the view
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            res.render('notes', { data: data });
        }

    })

})

///Listen to the port.
app.listen(process.env.PORT || 3000, function() {
    console.log('Listening to port 3000');
})