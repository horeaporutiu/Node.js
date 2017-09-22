class Cloudant {

  getTopPopularPhrases(){
    //Our HttpRequest that will enable us to talk to Watson
    phraseTitle.innerHTML = title;
    
    var getTopPhrases = new XMLHttpRequest();

    getTopPhrases.open("GET", url, true);
    getTopPhrases.onload = function() {
      var messyJson = JSON.parse(getTopPhrases.responseText)
      var topPhrase = messyJson.index.phrases
      
      if (topPhrase.length > 5) {
        var numberOfPopularPhrases = 5;
      }
      else {
        var numberOfPopularPhrases = topPhrase.length
      }
      
      for (var i = 0; i<numberOfPopularPhrases; i++){
        var phrase = document.createElement('span')
        phrase.innerHTML = (i+1) + ') ' + topPhrase[i].phrase;
        phraseList.appendChild(phrase);
      }
      
    }
    getTopPhrases.send()
  }

}
    
var text = document.createElement('p');
var title = 'Popular Phrases';
var url = 'https://openwhisk.ng.bluemix.net/api/v1/web/Developer%20Advocate_dev/demo1/getPopularPhrases';
var phraseList = document.getElementById('phraseList');
var phraseTitle = document.getElementById('phraseTitle');
var cloud = new Cloudant();
cloud.getTopPopularPhrases();


