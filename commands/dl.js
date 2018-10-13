const Discord = require("discord.js");
// const { google } = require("googleapis");
const readline = require("readline");
const spawn = require('child_process').spawn;
var fs = require("fs");
var path = require('path');
var rimraf = require('rimraf');
// const login = require("facebook-chat-api");

const {
  FgGreen,
  Reset,
  FgBlue,
  FgRed,
  FgYellow
} = require('../modules/color.js');

function create_path(path){
  fs.exists(path, function(exists){
    console.log(FgGreen + "[ check ]" + Reset + " folder exist : " + exists)
    if(exists == false){
      console.log(FgGreen + "[ check ]" + Reset + " Create folder")
      fs.mkdir(path, 0777, function(error){
        if(error) throw error;
      });
    }else{
      console.log(FgGreen + "[ check ]" + Reset + " use origin folder")
    }
  });
}

module.exports.run = async (bot, message, args) => {

  let project_path = `C:\\Users\\KW\\Desktop\\dis\\`;

  let filename_with_subdir = 'functions/converter.py';
  let filename = project_path + filename_with_subdir;

  let file_folder_path_ = `modules\\musics\\${message.author.id}`;
  let full_file_path = project_path + file_folder_path_;

  let url = args[0];

  // spawn('cmd.exe', ['rd', '/s', '/q', full_file_path]);
  try{
    rimraf(full_file_path, () => {
      console.log("rm folder");
      create_path(file_folder_path_);
    });
  }catch(err){
    create_path(file_folder_path_);
  }

  message.channel.send(`${message.author}` + ` 稍等一下喔～`);
  const bat = spawn('cmd.exe', ['/c', filename, url, full_file_path]);

  bat.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  bat.stderr.on('data', (data) => {
    console.log(data.toString());
  });

  bat.on('exit', (code) => {
    console.log(FgGreen + '[ Return ]' + Reset +` child process by ${message.author.id}, return code：${code}`);
    if(code === 0){
      // auth_send_to_googledrive(file_folder_path_ + '.zip')
      // message.channel.send("[ file table ]");
      let counter = 0;
      fs.readdir(full_file_path + '\\', (err, files) => {
        files.forEach(file => {
          var filename = path.basename(full_file_path + "/" + file);
          counter++;
          // message.channel.send(counter + ". " + filename);
          message.channel.send(counter + ". " + filename, new Discord.Attachment(full_file_path + "/" + file))
            .then(msg => {
              // message.channel.send(filename);
            })
            .catch(console.error);
        });
      });
    }
  });

  // spawn('cmd.exe', ['rd', '/s', '/q', full_file_path]);
}

module.exports.help = {
  name: "dl"
};
