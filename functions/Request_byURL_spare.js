var request = require('request');
var JSSoup = require('jssoup').default;

function removeHtmlTags(str) {
  str = str.replace(/&nbsp;/ig,'');
  str = str.replace(/&#039;/ig,'\'');
  str = str.replace(/&gt;/ig,'\<');
  str = str.replace(/&lt;/ig,'\>');
  str = str.replace(/amp;/ig,'\&');
  str = str.replace(/&quot;/ig,'\"');
  str = str.replace(/\r?\n/g, '<br />');
  str = str.replace('※ Mojim.com　魔鏡歌詞網 ','');
  str = str.replace('更多更詳盡歌詞 在','');
  return str;
}

module.exports = function Request_byURL_spare(message, lyrics_page, cb){
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
        if(tags.name === 'dd'){
          if(tags.attrs.class === 'fsZx3' && tags.attrs.id === 'fsZx3'){
            console.log("[ found lyrics ]");
            tag = 1;
            console.log(removeHtmlTags(tags.text));
            console.log("\n==============================================");
            message.channel.send(removeHtmlTags(tags.text.slice(0,(tags.text.length / 2))));
            message.channel.send(removeHtmlTags(tags.text.slice((tags.text.length / 2),tags.text.length)));
            cb(true);
            break;
          }
        }
        tags = tags.nextElement;
      }
      if(tag === -1){
        console.log("morjin not found");
        cb(false);
      }
    }else{
      cb(false);
    }
  }

  request(options, callback);
}
