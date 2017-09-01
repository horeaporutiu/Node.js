var credentials = require('./credentials.js');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3')
module.exports = {
  getToneAnalysis: function (postData) {
    var tone_analyzer = new ToneAnalyzerV3({
      username: credentials.myCredentials.toneUsername,
      password: credentials.myCredentials.tonePassword,
      version_date: '2016-05-19'
    });
      var params = {text: postData.text};
      tone_analyzer.tone(params, function(error, response) {
        if (error) {
          console.log('error:', error);
        }
        else {
          console.log(response)
          var tones = response.document_tone.tone_categories

          for (var i = 0; i < tones.length; i++){

            for (var j = 0; j < tones[i].tones.length; j++) {

              if(tones[i].tones[j].score > .5){
                console.log(tones[i].tones[j].tone_name +
                ", Score: " + tones[i].tones[j].score)
              }
            }
          }
        }
      });
  }
};
