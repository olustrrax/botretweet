var twit = require('twit');
var wordcut = require("wordcut");
var config = require('./config.js');
var Twitter = new twit(config);
var key = process.env.api_key;
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
                
                var tweet = data.statuses;
                var randomTweet = ranDom(tweet);
                var retweet_count = randomTweet.retweet_count;
                // console.log('retweet_count: '+randomTweet.retweet_count);
                var yesorno = exceptKey(randomTweet.text);
                // console.log('status: '+yesorno);
                var status = true;
                if(yesorno=='passed'){
                    var status = true;
                }
                else{
                    status = false;
                }
                if(status&&retweet_count > 100){
                    if(typeof randomTweet != 'undefined'){
                        Twitter.post('statuses/retweet/:id', {
                            //id: retweetId
                            id: randomTweet.id_str
                        }, function(err, response) {
                            //console.log('text: '+randomTweet.text);
                            if (!err&&response) {
                                // console.log('text: '+randomTweet.text);                            
                                // console.log('[Retweeted!]');
                            }
                            if (err) {
                                // console.log('text: '+randomTweet.text); 
                                // console.log('['+err+']');
                            }
                        });
                    }
                } 
                // else if(!status){
                //     console.log("No tweet: "+randomTweet.text);
                // }
                // else{

                //     console.log('retweet_cont < 100: '+randomTweet.text);
                // }
                
        }
          
      });
}


retweet();

setInterval(retweet, 9000);

// function to generate a random tweet tweet
function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};

function randomTrack (){
    var list = [
        'คุณแดน', 'คังแดเนียล', 'แดเนียล', 'เนียล', '#kangdaniel',
        'คังดาเนียล','ดาเนียล',
        //'강다니엘',
    ];
    var key = ranDom(list);
    // console.log('---------');
    // console.log('keyword: '+key);
    return key;
}

function exceptKey (text){
    var except = [
        'พร้อมส่ง','รวมส่ง','ขาย','มัดจำ','ค่าส่ง','ลทบ','สั่งซื้อ','รอบหิ้ว','นัดรับ',
        'พรี', 'pre','PRE','Pre','Order','order','ปิดพรี', 'Preorder','preorder',               
        'ตลาดนัดwannaone','ตลาดนัดWANNAONE', 'เปิดหาร','สั่ง',     
        'ตลาดนัดPRODUCE101','ตลาดนัดProduce101',        
        'ลัทธิน้องเนียล','องนีเอล',        
        'สโลแกน', 'สติ๊กเกอร์','การ์ดใส','พัดใส','sticker','เคส','Sticker',
        'Pls','Plz','PLS','แดนอุน','แดนฮุน','สตก',
        '@KangDaniel','@daniel','@kangdaniel','slateO'
    ];
    wordcut.init();
    //var text = 'ตลาดนัดWANNAONE รำคาญพวกนี้';
    var tweet_cut = wordcut.cut(text);
    var arr_word = tweet_cut.split('|');
    // console.log('wordcut: '+tweet_cut);
    for( var i = 0; i < arr_word.length; i++){
        for(var j = 0; j<except.length; j++){
            if(arr_word[i] == except[j]){
                return except[j];
            }
        }
    }
    if( i == arr_word.length && j == except.length){
        return 'passed';
    }
}