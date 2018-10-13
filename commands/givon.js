const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.channel.send(`so cute~~`);
  message.channel.send({
    files:[{
      attachment: 'modules/img/heart.jpg',
      name: 'heart.jpg'
    }]
  });
}

module.exports.help = {
  name: "阿文"
};
