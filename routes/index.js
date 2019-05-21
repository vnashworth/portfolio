var express = require('express');
var router = express.Router();
var helper = require('sendgrid').mail;



// FOR DEVELOPMENT ONLY
// const dotenv = require('dotenv');
// dotenv.config();

const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;

var email_response;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var from_email = new helper.Email('mail@victoriaash.com');
var to_email = new helper.Email(process.env.EMAIL);

router.get('/', function(req, res, next) {
    console.log(process.env.SENDGRID_API_KEY);
  res.render('index', { title: 'Victoria Nishimoto Ashworth', message: email_response });
  if (email_response) {
      email_response = null;
  }
});


router.post('/send_email', (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var subject = req.body.subject;
  var user_message = req.body.message.replace(/$/mg,'<br>');
  var content = new helper.Content('text/html', "Name: " + name + "<br>Email: " + email + "<br>Subject: " + subject + "<br>Message: " + user_message);
  console.log(content);
  var mail = new helper.Mail(from_email, subject, to_email, content);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);

    if (response.statusCode == 202) {
        email_response = "Your email has been sent successfully.";
    } else {
        email_response = "Something went wrong, please try again later or email directly.";
    }
    res.redirect("/");
  });

});

module.exports = router;
