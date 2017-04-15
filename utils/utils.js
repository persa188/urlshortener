//recommended options from mlab
exports.mongo_options = {
  server: {
    socketOptions:
    {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  },
    replset: {
      socketOptions:
      {
        keepAlive: 300000,
        connectTimeoutMS : 30000
      }
    }
  };

exports.statcodes = {
    _400: JSON.stringify({response:"bad request"}),
    _401: JSON.stringify({response:"unauthorized"}),
    _404: JSON.stringify({response: "not found"}),
    _409: JSON.stringify({response:"new user not created"}),
    _500: JSON.stringify({response:"server error"})
};

exports.stringify = function(obj) {
    return JSON.stringify(obj);
};
