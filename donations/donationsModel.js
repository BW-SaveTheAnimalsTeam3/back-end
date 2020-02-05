const db = require('../data/dbConfig.js');

module.exports = {
    add,
    findByCampaign,
    findByUser,
    findAll
}

function add(details){
    return db('donations').insert(details)
}

function findByCampaign(id){
    return db('donations').where({ campaign_id: id })
}

function findByUser(id){
    return db('donations').where({ user_id: id })
}

function findAll(){
    return db('donations')
}