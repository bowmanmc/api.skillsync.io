'use strict';
/**
 * reset
 *
 * Send password reset email
 */

// const nodemailer = require('nodemailer');
// const sesTransport = require('nodemailer-ses-transport');
// const AWS = require('aws-sdk');
//
// var ses = new AWS.SES({
//     region: 'us-east-1'
// });
// var transport = nodemailer.createTransport(sesTransport({
//     ses: ses
// }));
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');

var template = path.join(__dirname, '/../../../templates/account/reset.ejs');


module.exports = function(account, token) {

    // Compile the template and return a string to be emailed
    var result = ejs.render(
        fs.readFileSync(template, 'utf-8'), {
            account: account,
            token: token
        }, {
            filename: template
        }
    );
    return result;

    // console.log('Sending email to: ' + account.email);
    // transport.sendMail({
    //         transport : transport, //pass your transport
    //         from: 'support@skillsync.io',
    //         to : 'bowmanmc@gmail.com',
    //         subject : 'TEST',
    //         html: '<p> You can send email programatically via SES </p>'
    //     }, function(error) {
    //         console.log('Error sending email!', error);
    //     });
};
