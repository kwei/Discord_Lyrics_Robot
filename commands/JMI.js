const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  // let reason = args.join(" ").slice(22);
  message.channel.send(`別說了，上車!`);
  // files: ['https://cdn.discordapp.com/icons/222078108977594368/6e1019b3179d71046e463a75915e7244.png?size=2048']
  // files: [{
  //   attachment: 'entire/path/to/file.jpg',
  //   name: 'file.jpg'
  // }]
  message.channel.send({
    files:[{
      attachment: 'modules/img/JMI2.jpg',
      name: 'JMI2.jpg'
    }]
  });
}

module.exports.help = {
  name: "JMI"
};
