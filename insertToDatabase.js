//set up express application
var request = require('request');

module.exports = {
  insert: function (req,postData) {
    var auth = 'Basic ' + new Buffer(config.cloudantUsername + ':' + config.cloudantPassword).toString('base64');
    
    var time = Date.now();
    var parsedWords = [];
    var splitStr = req.body.text.split(/[ ,]+/).filter(Boolean);
    //split the words
    for (var i = 0; i < splitStr.length; i++){
      parsedWords[i] = splitStr[i];
    }

    var getRevId = {
      url: config.cloudantDatabaseUrl,
      method: 'GET',
      headers: {
          'Authorization': auth
      }
    };

    request.get(getRevId, function(err, body){
      if (err) {
        console.log(err);
      }
      var docObj = JSON.parse(body.body);
      //update dict object with database phrases
      var dict = docObj.index.phrases;
      //flag to check for duplicate entries
      var insertIntoDict = true;
      var phrases = req.body.text;
      //if it's first time inserting into DB
      if(dict.length <= 0) {
        dict.push({
          phrase: phrases,
          count: 1
        });
      } 
      else{
        //check every phrase in the database for a match
        for(var i=0;i<dict.length;i++){
           if (dict[i].phrase == phrases) {
             insertIntoDict=false;
             dict[i].count++;
             break;
           }
        }
        //if phrase is not in DB, add it!
        if(insertIntoDict){
          dict.push({
            phrase: phrases,
            count: 1
          });
        }
      }
      //sort by descending values
      dict.sort(function(a, b) {
        return (b.count) - (a.count);
      });

      var lastTranslation = {
        postData: postData,
        parsedWords: parsedWords,
        timestamp: time,
        phrases: dict
      };

      //revision number needed for Cloudant update
      var revisionNum = docObj._rev;
      var insertTranslation = {
        url: config.cloudantDatabaseUrl,
        method: 'PUT',
        json: {
          '_rev': revisionNum,
          'index':lastTranslation
        },
        headers: {
            'Authorization': auth,
            'Content-Type': 'application/json'
        }
      };
      request.put(insertTranslation, function(err, body){
        if (err) {
          console.log(err);
        }
      });
    });
  }
};
