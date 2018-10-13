const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.channel.send(`:D`);
  message.channel.send({
    files:[{
      attachment: 'modules/img/good.jpg',
      name: 'good.jpg'
    }]
  });
}

module.exports.help = {
  name: "MJ"
};
