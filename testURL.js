var http=require('http');
var url=require('url');
var port=3000;

http.createServer(function (req, res) {
    var qs=url.parse(req.url,true).query;
    console.log(req.url);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
    
}).listen(port);

console.log('Server is listening to port %d', port);



