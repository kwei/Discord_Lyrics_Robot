var request = require('request');
var JSSoup = require('jssoup').default;
var moment = require('moment');

var DB = require('../model/db_interface.js');

function removeHtmlTags(str) {
  str = str.replace(/&nbsp;/ig,'');
  str = str.replace(/&#039;/ig,'\'');
  str = str.replace(/&gt;/ig,'\<');
  str = str.replace(/&lt;/ig,'\>');
  str = str.replace(/amp;/ig,'\&');
  str = str.replace('※ Mojim.com　魔鏡歌詞網 ','');
  str = str.replace('更多更詳盡歌詞 在','');
  return str;
}

module.exports = function Request_byURL(message, song_name, lyrics_page, cb){

  var options = {
    url: encodeURI(lyrics_page),
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
    }
  };

  function callback(error, response, body) {
    var tag = -1;
    if (!error && response.statusCode == 200) {
      var soup = new JSSoup(body);
      soup.hidden = 'false';
      var tags = soup.nextElement.nextElement;
      while(tags != null){
        if(tags.name === 'p'){
          if(tags.attrs.class === 'lyrics'){
            console.log("[ found lyrics ]");
            tag = 1;
            console.log(removeHtmlTags(tags.text));
            console.log("\n==============================================");
            if(tags.text.length > 1500){
              message.channel.send(removeHtmlTags(tags.text.slice(0,1499)));
              message.channel.send(removeHtmlTags(tags.text.slice(1499, tags.text.length)));
            }else{
                message.channel.send(removeHtmlTags(tags.text));
            }

            let data = {
              dbURL: "mongodb://localhost:27017",
              dbName: "discord",
              tableName: message.author.username,
              obj: {
                user: message.author.username,
                timecode: moment().format('MM/DD/YYYY'),
                songname: song_name.toString(),
                lyrics: removeHtmlTags(tags.text)
              }
            };

            DB.addElement(data);

            cb(true);
            break;
          }
        }
        tags = tags.nextElement;
      }
      if(tag === -1){
        console.log("kkbox not found");
        cb(false);
      }
    }else{
      console.log("kkbox" + response.statusCode);
      cb(false);
    }
  }
  console.log("[ kkbox search ]");
  request(options, callback);
}
