// google api key : AIzaSyBf5zpY-eIS4qEJ5PGiy7O4ftOhsdt0gro
const Discord = require("discord.js");
var request = require('request');
var JSSoup = require('jssoup').default;
const ytdl = require('ytdl-core');

const {
  FgGreen,
  Reset,
  FgBlue
}= require('../modules/color.js');

const botconfig = require("../botconfig.json");

const YOUTUBE = require('youtube-search');
const Google_API_Key = 'AIzaSyBf5zpY-eIS4qEJ5PGiy7O4ftOhsdt0gro';
const opts = {
  maxResults: 10,
  key: Google_API_Key
};

const ROOT_URL = 'https://www.youtube.com';
const SEARCH = '/results?search_query=';

let prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {

  keywords = args;
  console.log('\n\t Key words : ' + FgBlue + keywords.toString() + Reset);

  // maybe add queue function here

  YOUTUBE(keywords.toString(), opts, (err, results) => {
    if(err){
      message.channel.send("Bad connection");
    }
    var iter = 0;
    var res = '';
    var quantities = results.length;
    for(iter = 0 ; iter < quantities ; iter++){
      console.log("");
      console.log(results[iter].title);
      console.log(results[iter].link);
      res = res + "[ " + (iter + 1).toString() + " ]\t" + results[iter].title + '\n';
    }

    let result = new Discord.RichEmbed()
      .setDescription("Search for " + keywords.toString())
      .setColor("#15f153")
      .addField("list", res);

    message.channel.send(result)
      .then((msg) => {
        message.channel.awaitMessages(res => res.author.id === message.author.id, {max: 1, time: 20000, errors: ['time']})
        .then(collected => {
          var chosen_number = collected.first().content;
          console.log("");
          console.log(chosen_number);
          console.log("");
          console.log(results[chosen_number - 1].title);
          console.log(results[chosen_number - 1].link);
          console.log("");
          msg.delete();
          if(message.member.voiceChannel){
            message.member.voiceChannel.join()
              .then(connection => {
                var stream = ytdl(
                  results[chosen_number - 1].link,
                  {filter: 'audioonly'}
                );
                var opt = {seek: 0, volume: 1};
                const dispatcher = connection.playStream(stream, opt);
              })
              .catch(err => {console.log(err)});
          }else{
            message.channel.send("You need to join a voice channel first!");
          }
        })
        .catch(err => {
          console.log(err);
          msg.delete();
        });
      })
      .catch(err => console.log(err));
  });
}


module.exports.help = {
  name: "find"
};
