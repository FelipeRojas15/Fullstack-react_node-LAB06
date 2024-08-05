const express = require("express");
const http = require('http');
const fs = require('fs');
const path = require('path');
const bp = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");




const hostname = 'localhost';
const port =2000;



const app = express();
app.use(morgan('dev'));
app.use(bp.json());
app.use(cors());

app.use( express.static(path.join(__dirname, 'public')));

app.use((req, res,next) => {
    //res.statusCode = 200;
    //res.setHeader("Content-Type", "text/html");
    //res.end('<html><body><h1>Respues servidor express</h1> </body> </html>');
    if (req.method == 'GET'){
        var arch;
        if (req.url == '/'){
            arch = '/index.html';

        }else {
            arch =req.url
        }
        
        var pathArch = path.resolve('./public' + arch);
        const extArch = path.extname(pathArch);
        console.log("path absoluto" + pathArch);
        if ( extArch == '.html'){
            fs.exists (pathArch, (e) => {
                res.setHeader('Content-Type', 'text/html');
                if(!e){
                    res.statusCode = 404;
                    res.end('<html><body><h1>Error 404:' + arch + ' </h1></body></html>')
                    return;
                }
                res.statusCode =200;
                fs.createReadStream(pathArch).pipe(res);

            });

        }else {
            res.statusCode=404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404:' + arch + ' </h1></body></html>');
        }
    }else {
        res.statusCode=405;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 405:' + 'El metodo ' + req.method + ' no esta permitido' + ' </h1></body></html>');

    }

});


app.listen(port, hostname, () => {
    console.log(`servidor en ejecucion en http://${hostname}:${port}`);
});
