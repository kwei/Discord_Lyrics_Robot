const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let usage = new Discord.RichEmbed()
    .setDescription("Commands")
    .setColor("#0000e3")
    .addField("[ $lyrics ]", "ex :  $lyrics song-name")

  message.channel.send("$lyrics song-name");
}

module.exports.help = {
  name: "help"
};
