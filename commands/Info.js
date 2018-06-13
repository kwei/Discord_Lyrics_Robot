const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
    .setDescription("About me")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("My name", bot.user.username)
    .addField("born", bot.user.createdAt);

    message.channel.send(botembed);
}

module.exports.help = {
  name: "Info"
};
