const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
var request = require('request');
var JSSoup = require('jssoup').default;

const Request_byURL = require('../functions/Request_byURL.js');

const ROOT = 'https://www.kkbox.com';
const search_page = 'https://www.kkbox.com/tw/tc/search.php?word=';

let prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {

  song_name = args.join(" ").slice(prefix.length - 1);

  var options = {
    url: encodeURI(search_page + song_name),
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var soup = new JSSoup(body);
      soup.hidden = 'false';
      var tags = soup.nextElement.nextElement;
      var count = 1;
      while(tags != null){
        if(tags.name === 'a'){
          if(tags.attrs.title === song_name){
            if(count === 1){
                lyrics_page = ROOT + tags.attrs.href;
                Request_byURL(message, lyrics_page);
            }
            count++;
          }
        }else if(tags.name === 'div'){
          if(tags.attrs.class === 'col-6'){
            for(var i = 0 ; i < 13 ; i++){
              tags = tags.nextElement;
            }
            if(count === 1){
              var lyrics_page = (ROOT + tags.attrs.href);

              Request_byURL(message, lyrics_page);
            }
            count++;
          }
        }else if(tags.name === 'p'){
          if(tags.attrs.class === 'state-desc'){
            message.channel.send(tags.text);
          }
        }
        tags = tags.nextElement;
      }
    }
  }
  request(options, callback);
}

module.exports.help = {
  name: "lyrics"
};
