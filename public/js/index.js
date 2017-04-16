var view = (function(){
  "use strict";

  var view = {};
  var server = 'localhost:7070';

  document.getElementById('shortener').onsubmit = function(e) {
    e.preventDefault();
    var url = document.getElementById('long-url').value;
    if (!/^(f|ht)tps?:\/\//i.test(url)) {
      url = "http://" + url;
    }
    var reqbody = {
      url: url
    };
    fetch('https://'+server+'/api/shorten/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              url: url
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            //@TODO refresh using same cstext (current search text)
            if (responseJson.short_url) responseJson.short_url = responseJson.short_url.replace(/"/g,"");
            document.getElementById('result').innerHTML = `
            shortened url: https://${server}/u/${responseJson.short_url}`;
          })
          .catch((error) => {
            console.error(error);
          });
  }

  return view;
}());
