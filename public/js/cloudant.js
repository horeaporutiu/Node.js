class Cloudant {
  getTopPopularPhrases(){
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
}

var phraseList = document.getElementById("phraseList")
var cloud = new Cloudant();
cloud.getTopPopularPhrases();


