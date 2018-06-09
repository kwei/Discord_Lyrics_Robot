var request = require('request');
var JSSoup = require('jssoup').default;

module.exports = function Request_byURL(message, lyrics_page){
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
            tag = 1;
            console.log(tags.text);
            console.log("\n==============================================");
            message.channel.send(tags.text.slice(0,(tags.text.length / 2) - 1));
            message.channel.send(tags.text.slice((tags.text.length / 2),tags.text.length));
          }
        }
        tags = tags.nextElement;
      }
      if(tag === -1){
        message.channel.send("找不到 嗚嗚嗚嗚嗚");
      }
    }
  }

  request(options, callback);
}
