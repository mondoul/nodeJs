var http = require('http'),
    app  = require('./app');

var server = http.createServer(app);

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server started at", addr.address + ":" + addr.port);
});
