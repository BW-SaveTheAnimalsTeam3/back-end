const express = require('express');

const usersRouter = require('../users/usersRouter.js')
const campaignsRouter = require('../campaigns/campaignsRouter.js')

const server = express();

server.get('/', (req, res) => {
    res.send('Save the Animals Api')
})

server.use('/api/users', usersRouter)
server.use('/api/campaigns', campaignsRouter)

module.exports = server;