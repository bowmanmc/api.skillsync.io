'use strict';

const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');
const AWS = require('aws-sdk');

var ses = new AWS.SES({
    region: 'us-east-1'
});
var transport = nodemailer.createTransport(sesTransport({
    ses: ses
}));

const SUPPORT = 'support@skillsync.io';


module.exports = function(address, subject, body) {
    console.log('Sending email to: ' + address);
    transport.sendMail({
            transport : transport, //pass your transport
            from: SUPPORT,
            to : address,
            subject : subject,
            html: body
        },
        function(error) {
            console.log('Error sending email!', error);
        }
    );
};
