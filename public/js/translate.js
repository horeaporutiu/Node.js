
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
  var OpenWhiskUrl = "https://openwhisk.ng.bluemix.net/api/v1/web/Developer%20Advocate_dev/demo1/toneAnalyzer";
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("POST", OpenWhiskUrl, true);
  ourRequest.setRequestHeader('Content-type','application/json');
  ourRequest.onload = function() {
    if (ourRequest.status == 400) {
      toneList.innerHTML = "Error, check your network connection.";
    }
    else {
      var response = JSON.parse(ourRequest.responseText);
      console.log(response);
      var list = "<p>Your Tone</p>";
      var tones = response.document_tone.tone_categories;
      for (var i = 0; i < tones.length; i++){

        for (var j = 0; j < tones[i].tones.length; j++) {
          if(tones[i].tones[j].score > 0.5){
            list = list.concat(tones[i].tones[j].tone_name+
            ", Score: " + tones[i].tones[j].score);
            list = list.concat(lineBreak);
          }
          toneList.innerHTML = list;
        }
      }
    }
  };
  ourRequest.send(json);
}
