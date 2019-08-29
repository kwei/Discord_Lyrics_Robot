var request = require('request');
var JSSoup = require('jssoup').default;
const botconfig = require("../botconfig.json");

const ROOT_SPARE = 'https://mojim.com'
const search_tail = '.html?t4';

const Request_byURL_spare = require('./Request_byURL_spare.js');

let prefix = botconfig.prefix;

module.exports = function Lyrics_Main(message, song_name){
  console.log(encodeURI(ROOT_SPARE + '/' + song_name.toString() + search_tail));
  var options_spare = {
    url: encodeURI(ROOT_SPARE + '/' + song_name.toString() + search_tail),
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
    }
  };

  function callback_spare(error, response, body) {
    var tag = -1;
    if (!error && response.statusCode == 200) {
      var soup = new JSSoup(body);
      soup.hidden = 'false';
      var tags = soup.nextElement.nextElement;
      var count = 1;
      console.log("==============================================\n");
      while(tags != null){
        if(tags.name === 'span'){
          if(tags.attrs.class === 'mxsh_ss2'){
            if(tags.nextElement.name === 'a'){
              try{
                var title = String(tags.nextElement.attrs.title).toLowerCase();
                var matched = true;
                for (var n = 0; n < song_name.length ; n++) {
                  if( title.indexOf(song_name[n]) === -1 ){
                    matched = false;
                  }
                }
                if(matched){
                  tag = 1;
                  console.log(ROOT_SPARE + tags.nextElement.nextElement.nextElement.nextElement.attrs.href);
                  var lyrics_page = ROOT_SPARE + tags.nextElement.nextElement.nextElement.nextElement.attrs.href;
                  console.log("[ found in morjin ]");
                  Request_byURL_spare(message, song_name, lyrics_page);
                  break;
                }
              }catch(e){
                // message.channel.send("Can't find!");
              }
            }
          }
        }
        tags = tags.nextElement;
        if(tags === null){
          message.channel.send("Can't find!");
        }
      }
    }else{
      message.channel.send("404");
    }
  }

  console.log("[ search 2 ]");
  request(options_spare, callback_spare);
}
