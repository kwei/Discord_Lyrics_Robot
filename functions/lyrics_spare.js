var request = require('request');
var JSSoup = require('jssoup').default;
const botconfig = require("../botconfig.json");

const ROOT = 'https://www.kkbox.com';
const search_page = 'https://www.kkbox.com/tw/tc/search.php?word=';

const Request_byURL = require('./Request_byURL.js');
const Lyrics_Main = require('../functions/lyrics_main.js');

let prefix = botconfig.prefix;
var isfound = true;

module.exports = function Lyrics_Spare(message, song_name){
  console.log(encodeURI(search_page + song_name.toString()));
  var options = {
    url: encodeURI(search_page + song_name.toString()),
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
    }
  };

  function callback(error, response, body) {
    var tag = -1;
    if (!error && response.statusCode == 200) {
      var soup = new JSSoup(body);
      soup.hidden = 'false';
      var tags = soup.nextElement.nextElement;
      var count = 1;
      var temp = tags;
      console.log("==============================================\n");
      while(tags != null){
        if(tags.name === 'a'){
          var title = String(tags.attrs.title).toLowerCase();
          if(tags.attrs.class === 'song-title'){
            var matched = true;
            for (var n = 0; n < song_name.length ; n++) {
              if( title.indexOf(song_name[n]) === -1 ){
                matched = false;
              }
            }
            if(matched){
              console.log(ROOT + tags.attrs.href);
              var lyrics_page = ROOT + tags.attrs.href;
              console.log("[ found in first ]");
              tag = 1;
              Request_byURL(message, song_name, lyrics_page, function(result){
                console.log(result);
                isfound = result;
                if(!isfound){
                  tags = temp;
                  while(tags != null){
                    if(tags.name === 'div'){
                      if(tags.attrs.class === 'col-6'){
                        for(var i = 0 ; i < 13 ; i++){
                          tags = tags.nextElement;
                        }
                        var title = String(tags.attrs.title).toLowerCase();
                        var matched = true;
                        for (var n = 0; n < song_name.length ; n++) {
                          if( title.indexOf(song_name[n]) === -1 ){
                            matched = false;
                          }
                        }
                        if(matched){
                          console.log(ROOT + tags.attrs.href);
                          var lyrics_page = (ROOT + tags.attrs.href);
                          console.log("[ found second ]");
                          tag = 1;
                          Request_byURL(message, song_name, lyrics_page, function(result){
                            console.log(result);
                            isfound = result;
                            if(!result){
                              Lyrics_Main(message, song_name);
                            }
                          });
                          break;
                        }else{
                          isfound = false;
                        }
                      }
                    }
                    tags = tags.nextElement;
                    if(tags === null){
                      Lyrics_Main(message, song_name);
                    }
                  }
                }
              });
              break;
            }
          }else{
            isfound = false;
          }
        }
        tags = tags.nextElement;
        if(tags === null){
          Lyrics_Main(message, song_name, function(result){
            if(!result){
              message.channel.send("Can't find!");
            }
          });
        }
      }
    }else{
      message.channel.send("404");
    }
  }
  console.log("[ search 1 ]");
  request(options, callback);
}
