const express = require('express');
//set up express application

const app = express();

app.use('/api', require('./routes/api'));

app.listen(process.env.port || 4000, function(){

  console.log('now listening for requests');

});
