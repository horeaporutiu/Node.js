var phraseList = document.getElementById("phraseList");
var targetLang = document.getElementById("target");
var source = document.getElementById("source");

// if someone clicks on the input language, make sure to update output lang.
source.addEventListener("change", updateOutputLang);

function getTopPopularPhrases(){
  var getTopPhrasesUrl = "https://openwhisk.ng.bluemix.net/api/v1/web/Developer%20Advocate_dev/demo1/getPopularPhrases"
  //Our HttpRequest that will enable us to talk to Watson
  var getTopPhrases = new XMLHttpRequest();
  var lineBreak = "<br>"
  var text = "<p>Popular Phrases</p>"
  getTopPhrases.open("GET", getTopPhrasesUrl, true);
  getTopPhrases.onload = function() {
    var messyJson = JSON.parse(getTopPhrases.responseText)
    var topPhrase = messyJson.index.phrases
    phraseList.insertAdjacentHTML('beforeend',text)
    if (topPhrase.length > 5) {
      var numberOfPopularPhrases = 5;
    }
    else {
      var numberOfPopularPhrases = topPhrase.length
    }
    for (var i = 0; i<numberOfPopularPhrases; i++){
      phraseList.insertAdjacentHTML('beforeend',(i+1) +') ')
      phraseList.insertAdjacentHTML('beforeend',topPhrase[i].phrase)
      phraseList.insertAdjacentHTML('beforeend',lineBreak)
    }
  }
  getTopPhrases.send()
}

//This function modifies Watson language translation options based on what user picks.
//Watson can only do certain domains.
function updateOutputLang() {

    if (document.getElementById("source")!== null){
        var sourceLang = document.getElementById("source").value;    
    }
  //Disable the user from picking English as output at the start of the program,
  //since English is by default the input
  targetLang.options[1].disabled = true;
  for (i = 0; i < targetLang.options.length; ++i) {
    targetLang.value = "English";
    targetLang.options[i].disabled = false;
  }
  if (sourceLang != "English") {
    for (i = 0; i < targetLang.options.length; ++i) {
      targetLang.value = "English";
      //diable all options since Watson tranlslates from
      //Arabic, Spanish, French and Portueguese to English only.
      if (targetLang.options[i].value != "English") {
        targetLang.options[i].disabled = true;
      }
    }
  }
  //Don't let user try to translate from English to English..doesn't make sense.
  else {
    targetLang.value = "Spanish";
    targetLang.options[1].disabled = true;
  }
}
//Need to call these functions at the beginning of the app.
getTopPopularPhrases();
updateOutputLang();
