const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
    .setDescription("關於我")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("我的名字", bot.user.username)
    .addField("出生於", bot.user.createdAt);

    message.channel.send(botembed);
}

module.exports.help = {
  name: "Info"
};
