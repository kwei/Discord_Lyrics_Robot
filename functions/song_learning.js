const Discord = require("discord.js");
const fs = require('fs');
const path = require('path');
const JSSoup = require('jssoup').default;
const readline = require("readline");

const {
  FgGreen,
  Reset,
  FgBlue,
  FgRed,
  FgYellow
} = require('../modules/color.js');

const module_path = 'C:\\Users\\KW\\Desktop\\dis\\modules\\musics\\';

function create_json(id){
  var filename = id + '.json';
  fs.exists(module_path + filename, (exists) => {
    console.log(FgGreen + "[ check ]" + Reset + " folder exist : " + exists);
    if(exists){
      console.log(FgGreen + "[ check ]" + Reset + " use origin file");
    }else{
      console.log(FgGreen + "[ check ]" + Reset + " Create new file");
      filename = module_path + filename;
      fs.open(filename, 'w', (err, file) => {
        if(err) throw err;
      });
    }
  });
}

exports.song_learning = function(message, song_name, callback){
  create_json(message.author.id);
  var json_obj = {
    table:[]
  };
  // fs.writeFile(/*JSON file name*/`${message.author.id}.json`, json, `utf8`, callback);
  fs.readFile(module_path + message.author.id + '.json', 'utf8', (err, data) => {
    if(err) throw err;
    if(data) json_obj = JSON.parse(data);
    json_obj.table.push({
      songName : song_name,
      time : message.createdAt
    });
    var json = JSON.stringify(json_obj);
    fs.writeFile(module_path + message.author.id + '.json', json, `utf8`, (err) => {console.log(err)});
  });
}
