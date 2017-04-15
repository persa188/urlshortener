var view = (function(){
  "use strict";

  var view = {};

  document.getElementById('shortener').onsubmit = function f(e) {
    e.preventDefault();
    var url = document.getElementById('long-url').value;
    if (!/^(f|ht)tps?:\/\//i.test(url)) {
      url = "http://" + url;
    }
    doAjax('POST', 'https://url.sanic.ca/api/shorten/', {url: url}, true, function (err, data) {
      if (err) console.log(err);
      if (!data) data = f(e);
      document.getElementById('result').innerHTML = `
      new url: https://url.sanic.ca/u/${!data.short_url}`;
    });
  }

  /*from thiery's lab5 code*/
  var doAjax = function (method, url, body, json, callback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(e){
        switch(this.readyState){
             case (XMLHttpRequest.DONE):
                if (this.status === 200) {
                    if (json) return callback(null, JSON.parse(this.responseText));
                    return callback(null, this.responseText);
                }else{
                    return callback(this.responseText, null);
                }
        }
    };
    xhttp.open(method, url, true);
    if (json) xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send((body)? JSON.stringify(body) : null);
  };

  return view;
}(window));
