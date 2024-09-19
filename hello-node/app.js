const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {

    const params = querystring.parse(url.parse(req.url).query);

    res.writeHead(200, {'Content-Type': 'text/html'});

    if('firstname' in params && 'lastname' in params) {
        res.write(
            '<!DOCTYPE html>'+
            '<html>'+
                '<head>'+
                    '<meta charset="utf-8" />'+
                    '<title>Mon app Node.js !</title>'+
                '</head>'+
                '<body>'+
                    `<p>Vous vous appelez ${params.firstname} ${params.lastname}</p>`+
                ' </body>'+
            '</html>'
        );
    } else {
        res.write(
            '<!DOCTYPE html>'+
            '<html>'+
                '<head>'+
                    '<meta charset="utf-8" />'+
                    '<title>Mon app Node.js !</title>'+
                '</head>'+
                '<body>'+
                    '<p>Vous devez bien avoir un prénom et un nom ?</p>'+
                '</body>'+
            '</html>'
        );
    }
    res.end();
});

server.listen(8080, () => {
    console.log('Serveur démarré sur le port 8080');
});