var request = require('request');
var yahooFinance = require('yahoo-finance');


class Info {

    getCurrentInfo(companyTicker) {
        return new Promise((resolve, reject) => {
            yahooFinance.quote({
                symbol: companyTicker,
                modules: ['price', 'summaryDetail']
            }, function(err, quote) {
                if(err){
                    console.log(err)
                    resolve(err);
                } else {
                    var marketPrice = quote.price.regularMarketPrice;
                    var marketChange = quote.price.regularMarketChangePercent;
                    var yearHigh = quote.summaryDetail.fiftyTwoWeekHigh;
                    var yearLow = quote.summaryDetail.fiftyTwoWeekLow;
                    var marketCap = quote.summaryDetail.marketCap;
                    if (marketCap != undefined) {
                        marketCap = marketCap.toLocaleString(undefined,{
                            minimumFractionDigits: 2
                        });
                    }
                    marketChange = (marketChange*100).toFixed(2);
                    resolve(" The price of " + companyTicker + " is: $" 
                    + marketPrice + ". The percent change for the day is: " + 
                    marketChange + "%. " +  " The market cap is: $" + 
                    marketCap +". " + " The year high price is: $" + yearHigh 
                    + "." + " The year low price is: $" + yearLow + "." );
                }
            });
        });
    }
    
}

module.exports = Info;