const db = require('../data/dbConfig.js');

module.exports = {
    add,
    findAll,
}

function add(details){
    return db('campaigns').insert(details)
}

function findAll(){
    return db('campaigns')
}