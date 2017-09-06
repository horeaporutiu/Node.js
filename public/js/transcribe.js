function transcribe() {

  var OpenWhiskUrl1 = "https://openwhisk.ng.bluemix.net/api/v1/web/Developer%20Advocate_dev/demo1/speechToText"
  var getSpeechToTextToken = new XMLHttpRequest();
  getSpeechToTextToken.open("GET", OpenWhiskUrl1, true);
  getSpeechToTextToken.onload = function() {
    if (getSpeechToTextToken.status == 400) {
      outputText.innerHTML = "Error, check your network connection.";
    }
    else {

      var stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
        objectMode: true,
        token: getSpeechToTextToken.responseText,
        outputElement: '#text' // CSS selector or DOM Element
      });

      stream.on('error', function(err) {
        console.log(err);
      });

      stream.on('data', function(data) {
        console.log(data);
        if(data.results[0] && data.results[0].final) {
          stream.stop();
          console.log('stop listening.');
        }
      });
    }
  }
  getSpeechToTextToken.send();
}
