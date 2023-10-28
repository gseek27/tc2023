const express = require('express');
const path = require('path');
const router = express.Router();

// Serve static files from the 'public' directory
router.use('/static', express.static(path.join(__dirname, '../public')));

// Serve the styles.css file with the correct Content-Type
router.get('/styles.css', (req, res) => {
    const filePath = path.join(__dirname, '../public/styles.css');
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(filePath);
});

// Serve the styles.css file with the correct Content-Type
router.get('/css/responsive.css', (req, res) => {
    const filePath = path.join(__dirname, '../css/responsive.css');
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(filePath);
});

module.exports = router;