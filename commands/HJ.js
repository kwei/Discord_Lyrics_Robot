const Discord = require("discord.js");
var fs = require("fs");

module.exports.run = async (bot, message, args) => {
  message.channel.send(`ㄐㄅ猴子 :hear_no_evil:`);
  message.channel.send({
    files:[{
      attachment: 'modules/img/monkey.jpg',
      name: 'monkey.jpg'
    }]
  });
}

module.exports.help = {
  name: "HJ"
};
