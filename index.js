import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

const PORT = 8080;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename, __dirname);

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET') {
      let filePath;

      if (req.url === '/') {
        filePath = path.join(__dirname, 'templates', 'home.html');
      } else if (req.url === '/about') {
        filePath = path.join(__dirname, 'templates', 'about.html');
      } else {
        filePath = path.join(__dirname, 'templates', '404.html');
      }

      const data = await fs.readFile(filePath, 'utf-8'); // Specify encoding
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(data);
    } else {
      res.writeHead(405, { 'content-type': 'text/html' });
      res.end('<h1>Method Not Allowed</h1>');
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.writeHead(500, { 'content-type': 'text/html' });
    res.end('<h1>Internal Server Error</h1>');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
