import express from "express"
import path from "path"; // Import path module
import { fileURLToPath } from "url"; // Required to resolve ES module paths

const app = express(); // Create an Express application

// Resolve the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up a route to serve an HTML file from the templates folder
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "home.html")); // Correct path to index.html
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
