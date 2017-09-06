function pronounce() {

  var targetLang = document.getElementById("target").value;
  var voice = '';
  //match voice to language for smooth pronunciation ;)
  switch(targetLang) {
    case "Spanish":
      voice = 'es-ES_EnriqueVoice';
      break;
    case "Portuguese":
      voice = 'pt-BR_IsabelaVoice';
      break;
    case "French":
      voice = 'fr-FR_ReneeVoice';
      break;
    case "English":
      voice = 'en-US_MichaelVoice';
      break;
    default:
      voice = 'es-ES_EnriqueVoice';
  }

  var OpenWhiskUrl = "https://openwhisk.ng.bluemix.net/api/v1/web/Developer%20Advocate_dev/demo1/textToSpeech";
  //Our HttpRequest that will enable us to talk to Watson
  var getTextToSpeechToken = new XMLHttpRequest();
  getTextToSpeechToken.open("GET", OpenWhiskUrl, true);
  //ourReq.setRequestHeader('Content-type','text/plain');
  getTextToSpeechToken.onload = function() {
    if (getTextToSpeechToken.status == 400) {
      outputText.innerHTML = "Error, check your network connection.";
    }
    else {

      var Watson = WatsonSpeech.TextToSpeech.synthesize({
        objectMode: true,
        voice: voice,
        token: getTextToSpeechToken.responseText,
        text: document.getElementById("transText").innerHTML
      });

    }
  };
  getTextToSpeechToken.send();
}
