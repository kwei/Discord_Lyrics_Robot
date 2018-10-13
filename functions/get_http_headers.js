// date : tue, 17 jul 2018 18:01:39 gmt
// content-encoding : gzip
// server : apache
// vary : accept-encoding
// content-type : text/html
// connection : keep-alive
// accept-ranges : bytes
// keep-alive : timeout=5, max=99
// content-length : 603
// Referer : http://truelogic.org/wordpress/2015/09/11/get-all-http-headers-in-javascript/
// UserAgent : Mozilla/5.0 (Windows NT 10.0; Win64; x64) \
  // AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36

exports.getHeaders = function(){
  var req = new XMLHttpRequest();
  req.open('GET', document.location, false);
  req.send(null);

  var data = new Object();

  // get all headers in one call and parse each item
  var headers = req.getAllResponseHeaders().toLowerCase();
  var aHeaders = headers.split('\n');
  var i =0;
  for (i= 0; i < aHeaders.length; i++) {
    var thisItem = aHeaders[i];
    var key = thisItem.substring(0, thisItem.indexOf(':'));
    var value = thisItem.substring(thisItem.indexOf(':')+1);
    data[key] = value;

  // get referer
  var referer = document.referrer;
  data["Referer"] = referer;

  //get useragent
  var useragent = navigator.userAgent;
  data["UserAgent"] = useragent;

  return data
}
