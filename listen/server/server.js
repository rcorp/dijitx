/** Web Socket to accept incoming requests from client **/
var io = require('socket.io').listen(8080);

io.sockets.on('connection', function (socket) {
    socket.on('data', function (reponse) {
        console.log(response);
    });
});

/** Sending Data to Google SPeech API v1 **/
var querystring = require('querystring');
var http = require('http'); 
var data = querystring.stringify({
      username: 'yourUsernameValue',
      password: 'yourPasswordValue'
});

var options = {
    host: 'my.url',
    port: 80,
    path: '/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length
    }
};

var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log("body: " + chunk);
    });
});

req.write(data);
req.end();


/** Converting to FLAC Format to send to Google Speech API **/
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }
exec("dir", function (err, stdout, stderr) {
    console.log (arguments)

});