import * as http from 'http';

http.createServer((req, res)=>{
    console.log('bla');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    res.end();
}).listen(8080);