/**
* this class basically adds emoji url support, add the punycode or url-encoded domain value as the host and the emoji value as the alias
* so the returned result will be the emoji url value instead of the punycode/url-encoded URI
*/
var alias = (function(){
  'use strict';
  var alias = {};
  var aliases = [{
    host: "xn--dk8hms.ws",
    alias: "&#x1F389;&#x1F4AF;.ws"
  },
  {
    host: "www.xn--dk8hms.ws",
    alias: "&#x1F389;&#x1F4AF;.ws"
  }];

  alias.getAlias = function (host) {
    var count;
    for (count = 0; count < aliases.length; count++) {
      if (aliases[count].host === host) {
        return aliases[count].alias;
      }
    }
    return host;
  };

  return alias;
}(window));
