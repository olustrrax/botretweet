var twit = require('twit');
var config = require('./config.js');
var Twitter = new twit(config);
var retweet = function() {
    var params = {
      q: 'คังแดเนียล, Kangdaniel',
     // count: 100,
      result_type: 'recent',
      lang: 'th'    
    } 
    Twitter.get('search/tweets', params, function(err, data) {
        
        if(err) {
            console.log('Something went wrong while SEARCHING...'+err);
        }
        else{
                // grab ID of tweet to retweet
                var retweetId = data.statuses[0].id_str;
                //var retweet_count = data.statuses[0].retweet_count;
                var tweet = data.statuses;
                var randomTweet = ranDom(tweet);
                if(typeof randomTweet != 'undefined'){
                    Twitter.post('statuses/retweet/:id', {
                        //id: retweetId
                        id: randomTweet.id_str
                    }, function(err, response) {
                        if (!err&&response) {
                           // if(!err)
                            console.log('Retweeted!!!');
                        }
                        if (err) {
                            console.log('Something went wrong while RETWEETING... Duplication maybe...'+err);
                        }
                    });
                }
        }
          
      });
}


retweet();

setInterval(retweet, 30000);

// function to generate a random tweet tweet
function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};