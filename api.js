var speak = require('simple-tts'),
    restify = require('restify'),
    url = require('url');

var server = restify.createServer();

server.get('/speak/:text', speakText);

function speakText(req, res) {
    var query = url.parse( req.url, true ).query;

    var options = {
        stream: res,
        format: "ogg"
    }
    
    if( query &&  query.format == "mp3" ){
        options.format = "mp3";
        res.writeHead(200, {'Content-Type': 'audio/mpeg'});
    }else{
        res.writeHead(200, {'Content-Type': 'audio/ogg'});
    }
    speak(decodeURIComponent( req.params.text ), {stream: res, format:"ogg"});
}

server.listen(3040, function() {
    console.log('%s listening at %s', server.name, server.url);
});
