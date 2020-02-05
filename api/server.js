const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('../users/usersRouter.js')
const campaignsRouter = require('../campaigns/campaignsRouter.js')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send('Save the Animals Api')
})

server.use('/api/users', usersRouter)
server.use('/api/campaigns', campaignsRouter)

module.exports = server;