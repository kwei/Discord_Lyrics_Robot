const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
var request = require('request');
var JSSoup = require('jssoup').default;
var counter = 0;

const Lyrics_Spare = require('../functions/lyrics_spare.js');
const Lyrics_Main = require('../functions/lyrics_main.js');

const {
  FgGreen,
  Reset,
  FgBlue
}= require('../modules/color.js');

let prefix = botconfig.prefix;
var isfound = false;
var prefound = 0;
var counter = 1;

module.exports.run = async (bot, message, args) => {

  song_name = args/*.join(" ").slice(prefix.length - 1)*/;
  console.log('\n\t Song Name : ' + FgBlue + song_name.toString() + Reset);
  Lyrics_Spare(message, song_name, function(result){
    console.log("\n==============================================");
    console.log('\n\t\t\t\t\t\t\t\t\t\t\t\t\t|== 累積搜尋次數：' + FgGreen + counter + Reset + ' ==|\n');
    counter++;
  })
}

module.exports.help = {
  name: "lyrics"
};
