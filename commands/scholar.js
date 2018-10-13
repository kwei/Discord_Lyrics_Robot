// https://scholar.google.com.tw/scholar?hl=zh-TW&as_sdt=0%2C5&q=
// class="gs_ab_mdw" -> content
const Discord = require("discord.js");
var request = require('request');
var JSSoup = require('jssoup').default;

const {
  FgGreen,
  Reset,
  FgBlue
}= require('../modules/color.js');

const botconfig = require("../botconfig.json");

const ROOT_URL = 'https://scholar.google.com.tw/scholar?hl=zh-TW&as_sdt=0%2C5&q=';

let prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {
  keywords = args;
  console.log('\n\t Key words : ' + FgBlue + keywords.toString() + Reset);
  console.log(encodeURI(ROOT_URL + keywords.toString()));

  var _options = {
    url: encodeURI(ROOT_URL + keywords.toString()),
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
    }
  };

  function _callback(error, response, body){
    if (!error && response.statusCode == 200){
      var soup = new JSSoup(body);
      soup.hidden = 'false';
      var tags = soup.nextElement.nextElement;
      console.log("==============================================\n");
      while(tags != null){
        if(tags.name === 'div'){
          if(tags.attrs.class === 'gs_ab_mdw'){
            console.log(tags.text);
            message.channel.send(tags.text);
          }
        }
        tags = tags.nextElement;
      }
    }else{
      message.channel.send("Bad connection");
    }
  }
  request(_options, _callback);

}




module.exports.help = {
  name: "scholar"
};
