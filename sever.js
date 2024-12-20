import { createServer } from 'http';

const PORT = 8000;

const users = [
  { id: 1, name: 'join dee' },
  { id: 2, name: 'join 5ee' },
  { id: 3, name: 'join fee' },
  { id: 4, name: 'join kgee' },
];

const server = createServer((req, res) => {
  // Handle `/api/users` GET request
  if (req.url === '/api/users' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(users));
    res.end();
  } 
  // Handle `/api/users/:id` GET request
  else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
    const id = parseInt(req.url.split('/')[3], 10); // Extract user ID from URL
    const user = users.find((user) => user.id === id);

    if (user) {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(user));
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ message: 'User not found' }));
      res.end();
    }
  } 
  // Handle unknown routes
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'Route not found' }));
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
