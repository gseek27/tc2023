
const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'public' directory
app.use('/static', express.static(path.join(__dirname, '../public')));

// Serve the styles.css file with the correct Content-Type
app.get('/styles.css', (req, res) => {
  const filePath = path.join(__dirname, '../public/styles.css');

  // Set the Content-Type header
  res.setHeader('Content-Type', 'text/css');

  // Send the file
  res.sendFile(filePath);
});

// Add more routes and configurations as needed
// Serve the styles.css file with the correct Content-Type
app.get('/css/responsive.css', (req, res) => {
    const filePath = path.join(__dirname, '../css/responsive.css');
  
    // Set the Content-Type header
    res.setHeader('Content-Type', 'text/css');
  
    // Send the file
    res.sendFile(filePath);
  });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
