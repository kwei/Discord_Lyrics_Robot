const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
var request = require('request');
var JSSoup = require('jssoup').default;

// const Lyrics_Spare = require('../functions/lyrics_spare.js');
// const Lyrics_Main = require('../functions/lyrics_main.js');
const L = require('../functions/L.js');

const {
  FgGreen,
  Reset,
  FgBlue
}= require('../model/color.js');

let prefix = botconfig.prefix;
var isfound = false;
var prefound = 0;
var counter = 1;

module.exports.run = async (bot, message, args) => {

  song_name = args/*.join(" ").slice(prefix.length - 1)*/;
  console.log('\nSong Name : ' + FgGreen + song_name.toString() + Reset);
  // Lyrics_Spare(message, song_name);
  L(message, song_name);
}

module.exports.help = {
  name: "L"
};
