const http = require('http');
const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter {};
// initialize the object
const myEmitter = new Emitter()
myEmitter.on('log', (msg, fileName)=>logEvents(msg, fileName));

// define port for local server
const PORT = process.env.PORT || 3500;

const serveFile = async(filepath, contentType, response) =>{
    try{
        const rawData = await fsPromises.readFile(
            filepath,
            !contentType.includes('images') ? 'utf8' :''
        );
        const data = contentType === 'application/json'
            ? JSON.parse(rawData) : rawData
         response.writeHead(
            filepath.includes('404.html') ? 404 : 200, 
            { 'content-Type': contentType });
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    }catch(err){
        console.log(err);
        myEmitter.emit('log', `${err.name}: ${err.message}`, "errLog.txt");
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res)=>{
    console.log(req.url, req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`, "reqLog.txt");

    const extension = path.extname(req.url)
    let contentType;

    switch(extension){
        case ".css":
            contentType = "text/css";
            break;
        case ".js":
            contentType = "text/javascripts";
            break;
        case ".json":
            contentType = 'application/json';
            break;
        case ".jpg":
            contentType = "image/jpeg";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".txt":
            contentType = "text/plain";
            break;
        default:
            contentType = "text/html";   
    }

    let filepath = 
        contentType === "text/html" && req.url === "/"
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === "text/html" && req.url.slice(-1) === "/"
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);
    
    //Mmake .html extensiom not required in the browser.
    if(!extension && req.url.slice(-1) !== '/') filepath += '.html';

    const fileExists = fs.existsSync(filepath);

    if(fileExists){
        serveFile(filepath, contentType, res);
    } 
    else{
        //404 file not available
        //301 redirect
        switch(path.parse(filepath).base){
            case 'old-page.html':
                res.writeHead(301, {'Location': '/new-page.html'});
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, {'Location': '/'});
                res.end();
                break;
            default:
                serveFile(path.join(__dirname, 'views', '404.html'),'text/html', res);
        } 
    }
})

server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));