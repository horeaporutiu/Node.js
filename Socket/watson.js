var request = require('request');

class Watson {

    translate(phraseToTranslate) {

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
                    console.log(error)
                    resolve(error);
                } else {
                    console.log(body)
                    resolve(body.translations[0].translation);
                }
            });
        });        
    }
}

module.exports = Watson;
var data = {};
var transUrl = 'https://gateway.watsonplatform.net/language-translator/api/v2/translate';

