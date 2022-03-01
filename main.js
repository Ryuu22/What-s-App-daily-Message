const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();

// Get phone number from cli arguments
const phonenumber = process.argv[2];

// Get desired time from cli arguments
const desiredTime = process.argv[3];

// Get Message from CLI
const message = process.argv[4];

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Logged succesfully');
    setInterval(attemptToSendMessage, 1000);
});

client.on('message', message => {
	console.log(message.body);
});

client.initialize();

function attemptToSendMessage() {
   if(isItTime()) {
        client.sendMessage(`${phonenumber}@c.us`, message);
        console.log('MESSAGE SENT');
   }
}

function isItTime() {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    if (time == desiredTime) {
        return true;
    }
    console.log('Not time yet', time);
    return false;
}
