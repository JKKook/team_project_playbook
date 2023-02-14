var http = require('http');

const PORT = process.env.PORT || 3000;

let httpServer = http.createServer((request, respone) => {
    respone.setHeader('Access-Control-Allow-origin', '*');
    respone.setHeader('Access-Control-Allow-Methods', 'Get, POST, OPTIONS, PUT, PATCH, DELETE');
    respone.setHeader('Access-Control-Allow-Credentials', 'true');
})