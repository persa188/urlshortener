var view = (function(window, alias, consts){
  "use strict";

  var view = {};
  // var server = "api2.sanic.ca";
  var server = "localhost:7070";

  var urlInput = document.getElementById("long-url");

  // select the returned shortened url
  view.myselect = function() {
    var link = document.getElementById("short_url");
    var range = document.createRange();
    range.selectNode(link);
    window.getSelection().addRange(range);
  }

  /*regex validation from
  https://stackoverflow.com/questions/2723140/validating-url-with-jquery-without-the-validate-plugin
  */
  var isUrlValid = function (url) {
      return /^((https?|s?ftp):\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&"\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&"\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&"\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&"\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&"\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
  }

  //validate form on the fly
  urlInput.onkeyup = function() {
    var e = document.querySelector(".shorten-submit");
    if (isUrlValid(this.value)) {
      e.classList.remove("disabled");
    } else {
      e.classList.add("disabled");
    }
  };

  // generic ajax request
  view.ajax = function(method, url, body, json, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      switch (this.readyState) {
        case (XMLHttpRequest.DONE):
          if (this.status === 200) {
            if (json) return callback(null, JSON.parse(this.responseText));
            else return callback(null, this.responseText);
          } else {
            return callback(this, null);
          }
      }
    };
    xhr.open(method, url);
    if (json && body){
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(body));
    } else{
      xhr.send(body);
    }
  };

  document.getElementById("shortener").onsubmit = function(e) {
    e.preventDefault();
    var url = document.getElementById("long-url").value;
    var custom = document.getElementById("custom-url").value;
    var result = document.getElementById("result");
    //auto-add http prefix
    if (!/^(f|ht)tps?:\/\//i.test(url)) {
      url = "http://" + url;
    }
    var reqbody = {
      url: url
    };

    if (!isUrlValid(url))
    {
      result.innerHTML = consts.resultInvalid;
    } else {
      //check if custom url set, if so change request path
      var requestPath = custom ? "https://"+server+"/api/shorten/custom":
        "https://"+server+"/api/shorten";
      // make the request
      console.log(url, custom);
      view.ajax("Post", requestPath ,
        {url: url, custom_url: custom}, true, function(err, data) {
          console.log(err);
        if (err) result.innerHTML = JSON.parse(err.responseText).response;
        else {
          if (data.short_url) result.innerHTML = `<p>shortened url: <a id="short_url"
            onclick="view.myselect();
            ">https://${alias.getAlias(window.location.host)}/u/${data.short_url.replace(/"/g,"")}</a></p>`;
        }
      });
    }
  }

  return view;
}(window, alias, consts));
