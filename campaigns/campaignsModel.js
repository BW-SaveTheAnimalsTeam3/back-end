const db = require('../data/dbConfig.js');

module.exports = {
    add,
    findAll,
    findById,
    findByOrgId,
    update,
    remove
}

function add(details){
    return db('campaigns').insert(details)
}

function findAll(){
    return db('campaigns')
}

function findById(id){
    return db('campaigns').where({ id }).first()
}

function findByOrgId(id){
    return db('campaigns').where({ org_id: id})
}

function update(changes, id){
    return db('campaigns').where({ id }).update(changes)
}

function remove(id){
    return db('campaigns').where({ id }).del()
}