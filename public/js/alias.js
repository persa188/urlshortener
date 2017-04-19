var alias = (function(){
  'use strict';
  var alias = {};
  var aliases = {
    "xn--dk8hms.ws": "&#x1F389;&#x1F4AF;.ws"
  };

  alias.getAlias = function (host) {
    return aliases.host ? aliases.host : host;
  };

  return alias;
}(window));
