var express=require('express');
var bodyParser=require('body-parser');
var nodemailer=require('nodemailer');



var app=express();

//template-engine
app.set('view engine','ejs');

app.use('/public',express.static('public'));

///body-parser middleware-
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


///set roots
app.get('/',(req,res)=>{
  res.render('index');
})

//manage post request
app.post('/send',(req,res)=>{
  let mail=req.body.mail
  var message=`
  <h4>Hello Ashutosh You have recieved new messsage ?</h4>
  <p>Name : ${req.body.name}</p>
  <p>Email : ${req.body.email}</p>
  <p>Mobile : ${req.body.mobile}</p>
  <h2>Message</h2>
  <p>${req.body.message}</p>

  
  ///Nodemailer-
  let transporter = nodemailer.createTransport({
          host: '**************',
          port: 26,
          secure: false, // true for 465, false for other ports
          auth: {
              user: 'test@ashutoshdwivedi.in', // generated ethereal user
              pass:' ***********'  // generated ethereal password
          },
          tls:{
            rejectUnauthorized: false
          }
      });

      // setup email data with unicode symbols
      let mailOptions = {
          from: '"Ashutosh Dwivedi 👻" <test@ashutoshdwivedi.in>', // sender address
          to: 'yourmail@gmail.com', // list of receivers
          subject: 'New email recieved ✔', // Subject line
          text: 'Hello world?', // plain text body
          html: message // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });
      res.redirect('/success');


})

///success route
app.get('/success',(req,res)=>{
  res.render('success');
})

app.listen(3000,()=>{
  console.log('Server started at port 3000');
})
