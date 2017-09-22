class Cloudant {

  getTopPopularPhrases(){
    //Our HttpRequest that will enable us to talk to Watson
    var getTopPhrases = new XMLHttpRequest();
    //var lineBreak = document.createElement('br')
    var lineBreak = document.createElement('BR');
    var text = document.createElement('p');
    text.innerHTML = title;

    getTopPhrases.open("GET", url, true);
    getTopPhrases.onload = function() {
      var messyJson = JSON.parse(getTopPhrases.responseText)
      var topPhrase = messyJson.index.phrases
      phraseList.appendChild(text)
      if (topPhrase.length > 5) {
        var numberOfPopularPhrases = 5;
      }
      else {
        var numberOfPopularPhrases = topPhrase.length
      }
      for (var i = 0; i<numberOfPopularPhrases; i++){
        var phrase = document.createElement('p')
        phrase.innerHTML = (i+1) + ") " + topPhrase[i].phrase;
        phraseList.appendChild(phrase);
      }
    }
    getTopPhrases.send()
  }

}

var title = "Popular Phrases";
var url = "https://openwhisk.ng.bluemix.net/api/v1/web/Developer%20Advocate_dev/demo1/getPopularPhrases"
var phraseList = document.getElementById("phraseList");
var cloud = new Cloudant();
cloud.getTopPopularPhrases();


