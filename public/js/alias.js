var alias = (function(){
  'use strict';
  var alias = {};
  var aliases = [{
    host: "xn--dk8hms.ws",
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
