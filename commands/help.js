const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let usage = new Discord.RichEmbed()
    .setDescription("Commands")
    .setColor("#0000e3")
    .addField("[ $lyrics ]", "ex :  $lyrics song-name")
    .addField("[ $Info ]", "ex :  $Info");

  message.channel.send(usage);
}

module.exports.help = {
  name: "help"
};
