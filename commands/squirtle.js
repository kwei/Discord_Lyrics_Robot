const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.channel.send(`www`);
  message.channel.send({
    files:[{
      attachment: 'modules/img/NO.jpg',
      name: 'NO.jpg'
    }]
  });
}

module.exports.help = {
  name: "傑尼龜"
};
