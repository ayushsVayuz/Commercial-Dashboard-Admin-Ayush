const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

// Absolute path to dist
const distPath = path.join(__dirname, "../dist");

// Serve static files
app.use(express.static(distPath));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Port (Vercel injects this)
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
