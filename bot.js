var twit = require('twit');
var wordcut = require("wordcut");
var config = require('./config.js');
var Twitter = new twit(config);
var retweet = function() {
    var params = {
      q:  randomTrack(),
      count: 10,
      result_type: 'recent',
      lang: 'th'    
    } 
    Twitter.get('search/tweets', params, function(err, data) {
        
        if(err) {
            console.log('Something went wrong while SEARCHING...'+err);
        }
        else{
                //var retweetId = data.statuses[0].id_str;
                //var retweet_count = data.statuses[0].retweet_count;
                
                var tweet = data.statuses;
                var randomTweet = ranDom(tweet);

                //console.log(randomTweet.text);
                var yesorno = exceptKey(randomTweet.text);
                console.log('status: '+yesorno);
                if(yesorno){
                    if(typeof randomTweet != 'undefined'){
                        Twitter.post('statuses/retweet/:id', {
                            //id: retweetId
                            id: randomTweet.id_str
                        }, function(err, response) {
                            console.log('text: '+randomTweet.text);
                            if (!err&&response) {
                                console.log('[Retweeted!]');
                            }
                            if (err) {
                                console.log('['+err+']');
                            }
                        });
                    }
                } 
                else if(!yesorno){
                    console.log("No tweet: "+randomTweet.text);
                }
                
        }
          
      });
}


retweet();

setInterval(retweet, 10000);

// function to generate a random tweet tweet
function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};

function randomTrack (){
    var list = [
        'คุณแดน', 'คังแดเนียล', 'แดเนียล', 'เนียล', 'kangdaniel',
        //'강다니엘',
    ];
    var key = ranDom(list);
    console.log('---------');
    console.log('keyword: '+key);
    return key;
}

function exceptKey (text){
    var except = [
        'พร้อมส่ง','รวมส่ง','ขาย','มัดจำ','ค่าส่ง','ลทบ',
        'พรี', 'pre','PRE','Pre','Order','order','ปิดพรี',                
        'ตลาดนัดwannaone','ตลาดนัดWANNAONE',        
        'ตลาดนัดPRODUCE101','ตลาดนัดProduce101',        
        'ลัทธิน้องเนียล','องนีเอล',        
        'สโลแกน',
    ];
    wordcut.init();
    //var text = 'ตลาดนัดWANNAONE รำคาญพวกนี้';
    var tweet_cut = wordcut.cut(text);
    var arr_word = tweet_cut.split('|');
    //console.log('wordcut: '+except.length);
    for( var i = 0; i < arr_word.length; i++){
        for(var j = 0; j<except.length; j++){
            if(arr_word[i] == except[j]){
                return false;
            }
        }
    }
    if( i == arr_word.length && j == except.length){
        return true;
    }
}