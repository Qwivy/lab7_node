const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const port = 1337;

function serveStaticFile(filePath, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end("Internal Server Error");
            console.error(`Error reading file: ${filePath}\n`, err);
            return;
        }

        // Determine content type
        const ext = path.extname(filePath).toLowerCase();
        let contentType = 'text/plain';

        if (ext === '.html') {
            contentType = 'text/html';
        } else if (ext === '.css') {
            contentType = 'text/css';
        } else if (ext === '.js') {
            contentType = 'application/javascript';
        } else if (['.png', '.jpg', '.jpeg', '.gif', '.svg'].includes(ext)) {
            contentType = `image/${ext.substring(1)}`;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0].replace(/\/$/, '').toLowerCase();

    let filePath = '';
    if (urlPath === '' || urlPath === '/index') {
        filePath = 'public/index.html';
    } else if (urlPath === '/404') {
        filePath = 'public/404.html';
    } else if (urlPath === '/contact') {
        filePath = 'public/contact.html';
    }else if (urlPath === '/posts') {
        filePath = 'public/posts.html';
    }else if (urlPath === '/underconstruction') {
        filePath = 'public/under-construction.html';
    }else if (urlPath.startsWith('/css/')) {
        filePath = path.join('public', urlPath);
    } else if (urlPath.startsWith('/images/')) {
        filePath = path.join('public', urlPath);
        console.log(filePath)
    } 

    
    serveStaticFile(filePath, res);
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
