/**
 * LandingController
 *
 * @description :: Server-side logic for managing landings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

var auth = {
  auth: {
    api_key: 'key-191b83b7f29c275d8653667a05e3c028',
    domain: 'sandbox9776a2db7c4447bfbe519fb80d624297.mailgun.org'
  }
}

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport(mg(auth));


module.exports = {
	
	index:function(req,res){
		res.view({})
	},
	
	flux:function(req,res){
		res.view({})
	},

	sendmail:function(req,res){
		
		var from = req.param('Name') || 'The Wedding',
			text = req.param('Song') || 'Anything by Nickelback';
		
		// setup e-mail data with unicode symbols
		var mailOptions = {
		    from: from+'✔ <request@claireandalexmuro.com>', // sender address
		    to: 'claire.k.luber@gmail.com, am3081@gmail.com', // list of receivers
		    subject: 'Wedding Song Request', // Subject line
		    text: text+'✔', // plaintext body
		    html: '<b>'+text+'✔</b>' // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		       	res.json({responseText:error})
		    }else{
		    	res.json({responseText:'success'})
		        //console.log('Message sent: ' + info.response);
		    }
		});
	}
	
};

