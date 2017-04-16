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
    // doAjax('POST', 'https://url.sanic.ca/api/shorten/', {url: url}, true, function (err, data) {
    //   if (err) console.log(err);
    //   document.getElementById('result').innerHTML = `
    //   new url: https://url.sanic.ca/u/${data.short_url}`;
    // });
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
            document.getElementById('result').innerHTML = `
            shortened url: https://${server}/${responseJson.short_url}`;
          })
          .catch((error) => {
            console.error(error);
          });

  }

  return view;
}(window));
