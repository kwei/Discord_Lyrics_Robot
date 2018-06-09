const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let sicon = message.guild.displayAvatarURL;
  let serverembed = new Discord.RichEmbed()
  .setDescription("Server Information")
  .setColor("#15f153")
  .setThumbnail(sicon)
  .addField("Server Name", message.guild.name)
  .addField("Create On", message.guild.createdAt)
  .addField("You Joined", message.guild.joinedAt)
  .addField("Total Members", message.guild.memberCount);

  message.channel.send(serverembed);
}

module.exports.help = {
  name: "serverInfo"
};
