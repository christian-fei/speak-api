var speak = require('simple-tts'),
    restify = require('restify');

var server = restify.createServer();

server.get('/speak/:text', speakText);

function speakText(req, res) {
    res.writeHead(200, {'Content-Type': 'audio/ogg'});
    speak(decodeURIComponent( req.params.text ), {format:'ogg', stream:res});
}

server.listen(3040, function() {
      console.log('%s listening at %s', server.name, server.url);
});
