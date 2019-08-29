const Discord = require("discord.js");
var request = require('request');
var JSSoup = require('jssoup').default;
const botconfig = require("../botconfig.json");

const prelink = 'https://www.kkbox.com/tw/tc/search.php?word=';

const new_lyrics_parser = require('./new_lyrics_parser.js');

let prefix = botconfig.prefix;

let searchingResult = [];

module.exports = function Lyrics_Main(message, song_name){
  console.log(encodeURI(prelink + song_name.toString()));
  var options = {
    url: encodeURI(prelink + song_name.toString()),
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var soup = new JSSoup(body);
      soup.hidden = 'false';
      var tags = soup.nextElement.nextElement;
      console.log("==============================================\n");
      while(tags != null){
        if(tags.name === 'div' && tags.attrs.class === 'search-group'){
          break;
        }
        tags = tags.nextElement;
      }
      if(tags === null){
        // break with msg of not found
      }else{
        tags = tags.nextElement.nextElement;
        // console.log(tags.attrs.class);
        let result_link;
        let result_title;
        let result_author;
        for(let i = 0; i < 10 ; i++){
          while(tags != null){
            if(tags && tags.name === 'td' && tags.attrs.class === 'song-data'){
              tags = tags.nextElement;
              // console.log(tags.attrs.href);
              result_link = tags.attrs.href
              // console.log(tags.attrs.title);
              result_title = tags.attrs.title;
              break;
            }
            tags = tags.nextElement;
          }
          while(tags != null){
            if(tags.name === 'div' && tags.attrs.class === 'song-artist-album'){
              tags = tags.nextElement;
              // console.log(tags.attrs.title);
              result_author = tags.attrs.title;
              break;
            }
            tags = tags.nextElement;
          }
          searchingResult.push({
            index: i + 1,
            song: result_title,
            link: "https://www.kkbox.com" + result_link,
            author: result_author
          });
        }

        console.log(searchingResult);
        console.log(searchingResult.length);
        if(searchingResult.length > 0){
          let embed = new Discord.RichEmbed()
          .setTitle("[ 選一個你要的 ]")
          .setColor(3447003);
          searchingResult.forEach(function(element){
            let option = element.index + '. ' + element.song + ' - ' + element.author;
            option = option.replace(/&gt;/ig,'\<');
            option = option.replace(/&lt;/ig,'\>');
            console.log(option);
            embed.addField(option, element.link);
          });

          message.channel.send({embed});
          // selecting
          let selectingLimit = 0;
          const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 15000 });
          console.log(collector);
          collector.on('collect', _message => {
            console.log(_message.content);
            if(_message.content > 0 && _message.content < 11 && selectingLimit === 0) {
              try{
                selectingLimit += 1;
                message.channel.bulkDelete(2);
                let selected = searchingResult[_message.content - 1];
                console.log(selected);
                new_lyrics_parser(message, selected);
                searchingResult = [];
              }catch{
                selectingLimit = 0;
              }
              
            }
          });
          collector.on('end', collected => {
            searchingResult = [];
            console.log(`Collected ${collected.size} items`);
            if(selectingLimit === 0){
              message.channel.send("你超時了喔ㄐㄅ人");
            }
          });
        }else{
          message.channel.send("找不到ㄟ");
        }
      }
    }
  }

  request(options, callback);
}
