// https://discordapp.com/oauth2/authorize?client_id=448479589132402698&scope=bot

const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");

// const cmd = require("node-cmd");
const child_process = require("child_process");

const L = require('./functions/L.js');

require("dotenv").config();

let dbcmd = "mongod --dbpath " + process.env.DB_PATH;
let handler = child_process.exec(dbcmd);
handler.stdout.on('data', (data) => {
	console.log('stdout: ' + data);
});
handler.on('close', (code) => {
	console.log('child process exited code ' + code);
});

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

// load cmds
fs.readdir("./commands/", (error, files) => {
  if(error) console.log(error);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity(" ", {type: "$"});
});

bot.on("message", async (message) => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  // if(cmd === `${prefix}吃覽趴囉`){
  //   return message.channel.send(`${message.author} 吃起來`);
  // }
  // else if(cmd === `${prefix}然後呢`){
  //   return message.channel.send(`他們說 ${message.author} 的心似乎痊癒了。`);
  // }else if(cmd === `${prefix}真的是`){
  //   return message.channel.send(`會被 ${message.author} 給氣死ㄟ`);
  // }else if(cmd === `${prefix}學弟的覽趴`){
  //   return message.channel.send(`沒有 ${message.author} 的好吃啦 <3`);
  // }

  if(cmd.includes(`${prefix}`)){
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);
  }
  // else if(cmd.includes(`!find`) || cmd.includes(`$find`)){
  //   let song_name = args.join(" ").slice(`!find`);
  //   console.log("\nsong name : " + song_name);
  //   song_learning(message, song_name, function callback(results){
  //     console.log(results);
  //   });
  // }
});

bot.on('error', async (error) => {
  console.log(error);
});

bot.login(botconfig.token);
