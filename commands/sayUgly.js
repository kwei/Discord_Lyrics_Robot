const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("Couldn't find user.");
  //console.log(rUser.user.username);
  if(rUser.user.username === bot.user.username) return message.channel.send("想罵我啊?");

  message.channel.send(`${rUser} 醜八怪`);
}

module.exports.help = {
  name: "sayUgly"
};
