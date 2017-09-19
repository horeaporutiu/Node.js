document.getElementById("pronounce").addEventListener("click", pronounce);
document.getElementById("translate").addEventListener("click", translate);
document.getElementById("record").addEventListener("click", record);
var outputText = document.getElementById("transText"); //variable that will hold our final translation
var loader = document.getElementById("myLoader");
var data = {};

loader.hidden = true; //hide loader at the start of the app

function translate() {
    var analyzeTone = false;
    outputText.hidden = true;
    loader.hidden = false;
    //load up our data by extracting from text field and drop down menus
    data.source = document.getElementById("source").value;
    data.target = document.getElementById("target").value;
    data.text = document.getElementById("text").value;
    //need to convert to string to be able to communicate over HTTP
    var json = JSON.stringify(data);
    var nodeKituraUrl = "http://localhost:8080/translates";
    //var OpenWhiskUrl = "https://openwhisk.ng.bluemix.net/api/v1/web/Developer%20Advocate_dev/demo1/test"
    //Our HttpRequest that will enable us to talk to Watson
    var ourRequest = new XMLHttpRequest();
    //TODO: change URL as needed to use different back end services ;)
    ourRequest.open("POST", nodeKituraUrl, true);
    ourRequest.setRequestHeader('Content-type','application/json');
    ourRequest.onload = function() {
      if (ourRequest.status == 400) {
        outputText.innerHTML = "Error, check your network connection.";
      }
      else {
        //set the response from Watson to a div
        outputText.innerHTML = ourRequest.responseText;
        analyzeTone = true;
      }
      outputText.hidden = false;
      loader.hidden = true;
      if(analyzeTone){
        getToneAnalysis(data);
      }
    };
    ourRequest.send(json);
  }
  
  function getToneAnalysis(data){
    var textForToneAnalysis = {};
    var lineBreak = "<br>";
    textForToneAnalysis.text = document.getElementById("text").value;
    var json = JSON.stringify(textForToneAnalysis);
    var owUrl = "https://openwhisk.ng.bluemix.net/api/v1/web/Developer%20Advocate_dev/demo1/toneAnalyzer";
    var ourRequest = new XMLHttpRequest();
    ourRequest.open("POST", owUrl, true);
    ourRequest.setRequestHeader('Content-type','application/json');
    //TODO ourReq.addEventListner("load", function(){})
    ourRequest.onload = function() {
      if (ourRequest.status == 400) {
        toneList.innerHTML = "Error, check your network connection.";
      } else {
        var response = JSON.parse(ourRequest.responseText);
        console.log(response);
        //TODO: change to document.createElement
        var list = "<p>Your Tone</p>";
        var tones = response.document_tone.tone_categories;
        for (var i = 0; i < tones.length; i++){
  
          for (var j = 0; j < tones[i].tones.length; j++) {
            if(tones[i].tones[j].score > 0.5){
              list = list.concat(
                tones[i].tones[j].tone_name +
                ", Score: " +
                tones[i].tones[j].score
              );
              list = list.concat(lineBreak);
            }
            toneList.innerHTML = list;
          }
        }
      }
    };
    ourRequest.send(json);
  }

function pronounce(){
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

    function record() {
      console.log('sdf')
      
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