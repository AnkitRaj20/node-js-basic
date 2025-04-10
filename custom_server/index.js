import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileName);

/**
 * Creates an HTTP server that serves static files based on the request URL.
 * 
 * - Serves `index.html` for the root URL ("/").
 * - Determines the MIME type of the requested file based on its extension.
 * - Reads the requested file from the filesystem and serves it with the appropriate content type.
 * - Returns a 404 error with a custom message if the file is not found.
 * 
 * @param {http.IncomingMessage} req - The HTTP request object.
 * @param {http.ServerResponse} res - The HTTP response object.
 */
const server = http.createServer((req,res) => {
    const filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);

    const extensionName = String(path.extname(filePath)).toLowerCase();

    const mimeTypes = {
        ".html" : "text/html",
        ".js" : "text/javascript",
        ".css" : "text/css",
        ".json" : "application/json",
        ".png" : "image/png",
        ".jpg" : "image/jpeg",
        ".gif" : "image/gif",
    }

    const conetentType = mimeTypes[extensionName] || "application/octet-stream";

    fs.readFile(filePath, (err, content) => {
        if(err){
            if(err.code == 'ENOENT'){
                res.writeHead(404, {'content-type' : 'text/html'})
                res.end("Page Not Found Broooooooo")
            }
        }else{
            res.writeHead(200 , {'content-type' : conetentType});
            res.end(content, 'utf-8');
        }
    })
});


server.listen(3000, () => {
  console.log('Server is running on port 3000');
})