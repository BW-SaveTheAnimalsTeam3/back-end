const express = require('express');

const server = express();

server.get('/api', (req, res) => {
    res.send('Save the Animals Api')
})

module.exports = server;