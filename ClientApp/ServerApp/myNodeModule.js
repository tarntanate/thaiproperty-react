const os = require('os');
const moment = require('moment');
moment.locale('th');
const m1 = moment();
module.exports = function(callback) { 
  // In this trivial example, we don't need to receive any 
  // parameters - we just send back a string 
  
  var message = `วัน${m1.format('ddd ที่ Do MMM YYYY เวลา H:mm')}<br/>Hostname: ${os.hostname} at ${m1.fromNow()}`;
  callback(/* error */ null, message); 

};
