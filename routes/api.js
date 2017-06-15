const express = require('express');
const router = express.Router();

router.get('/ninjas', function(req,res){

  res.send({type:'GET'});
});

router.post('/ninjas', function(req,res){

  res.send({type:'POST'});
});

module.exports = router;
