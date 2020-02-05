const knex = require('knex');

const configOptions = require('../knexfile').development;

module.exports = knex(configOptions);

// require('dotenv').config();

// const knex = require('knex');
// const knexConfig = require('../knexfile.js');
// const environment = process.env.DB_CONNECT || "development";

// module.exports = knex(knexConfig[environment]);