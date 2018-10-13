const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.channel.send(`醜八怪`);
  message.channel.send({
    files:[{
      attachment: 'modules/img/ugly.jpg',
      name: 'ugly.jpg'
    }]
  });
}

module.exports.help = {
  name: "KW"
};
