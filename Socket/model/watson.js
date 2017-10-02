var request = require('request');
var Company = require('./company.js')
var Info = require('./info.js')

class Watson {

    translate(phraseToTranslate) {

        console.log(config.conversationUsername);

        return new Promise((resolve, reject) => {

            data.source = 'en';
            data.target = 'es';
            data.text = phraseToTranslate;
    
            request.post({
                headers: {'content-type':'application/json'},
                url : transUrl,
                json : data,
                auth: {
                  user: config.translateUsername,
                  pass: config.translatePassword
                }
            }, function (error, response, body){
                if (error) {
                    console.log(error);
                    resolve(error);
                } else {
                    console.log(body);
                    resolve(body.translations[0].translation);
                }
            });
        });        
    }

    talkToWatson(userInput) {

        return new Promise((resolve, reject) => {
      
        // Replace with the context obtained from the initial request
            var context = {};

            console.log('before request post')

            //params for HTTP call to Watson Conversation
            var options = {
                url: convoUrl,
                'method': 'POST',
                json: {
                    'input': {
                        'text' : userInput
                    }
                }, 
                auth: {
                    user: config.conversationUsername,
                    pass: config.conversationPassword
                }
            };

            request(options,function(error,response,body){
                if(error){
                    console.log(error)
                }
                console.log(response.body.intents)
                let company = new Company();
                let info = new Info();
                if(!body.input) {
                    return response.json(body)
                }
                if (body.input === undefined) {
                    console.log(body)
                    resolve('error')
                } else {
                    company.findCompany(body.input.text).then(function(stockTicker){
                        if (stockTicker.length > 4) {
                            resolve(stockTicker)
                        }
                        return stockTicker;
                    }).then(function(stockTicker){
                        resolve(info.getCurrentInfo(stockTicker))
                    }).catch(console.log.bind(console));
                }
                
            });
  
        });
    }
}

module.exports = Watson;
var data = {};
var searchError = 'Please try again, we could not find your company'
var transUrl = 'https://gateway.watsonplatform.net/language-translator/api/v2/translate';
var convoUrl = 'https://watson-api-explorer.mybluemix.net/conversation/api/v1/workspaces/60f188c8-a8f7-4357-8225-072061ae18b7/message?version=2017-05-26'
