require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Welcome to Binge Worthy',
     from: '+12526544578',
     to: '+18184147804'
   })
  .then(message => console.log(message.sid));