const Discord = require("discord.js");
var request = require('request');
var JSSoup = require('jssoup').default;

const {
  FgGreen,
  Reset,
  FgBlue
}= require('../modules/color.js');

const botconfig = require("../botconfig.json");

const ROOT_URL = 'http://okgo.tw';
const SEARCH = '/Search.html?kw=';
const SEARCH_TAIL = '&st=1';

let prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {
  let travelschannel = message.guild.channels.find(`name`, "travel");
  if(!travelschannel) return message.channel.send("Couldn't find travel channel.");
  keywords = args;
  console.log('\n\t Key words : ' + FgBlue + keywords.toString() + Reset);
  var options = {
    url: encodeURI(ROOT_URL + SEARCH + keywords.toString() + SEARCH_TAIL),
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
    }
  };
  function callback(error, response, body){
    if (!error && response.statusCode == 200){
      var soup = new JSSoup(body);
      var tags = soup.nextElement.nextElement;
      while(tags != null){
        if(tags.name === 'a'){
          if(tags.attrs.class === 'STopic'){
            var title = tags.attrs.title;
            var url_path = '/' + tags.attrs.href;
            console.log("\n=============================================");
            console.log("title : " + title);
            console.log("link : " + ROOT_URL + url_path);
            console.log("=============================================");
            // let result = new Discord.RichEmbed()
            //   .setDescription("Search for " + keywords.toString())
            //   .setColor("#15f153")
            //   .addField("title", title)
            //   .addField("link", ROOT_URL + url_path);
            //
            // message.channel.send(result);
            travelschannel.send("Search result : " + title);
            travelschannel.send(ROOT_URL + url_path);
          }
        }
        tags = tags.nextElement;
      }
    }else{
      travelschannel.send("Bad connection");
    }
  }
  request(options, callback);
}


module.exports.help = {
  name: "travel"
};
