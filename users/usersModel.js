const db = require('../data/dbConfig.js')

module.exports = {
    add,
    addOrg,
    findAll,
    findBy,
    findOrgById,
    removeUser,
    removeOrg
}

function add(creds) {
    return db('users').insert(creds, "id")
}

function addOrg(orgCreds){
    return db('organizations').insert(orgCreds, "id")
}

function findAll(){
    return db('users')
}

function findBy(username){
    return db('users').where(username)
}

function findOrgById(id){
    return db('organizations').where({user_id: id})
}

function removeUser(id){
    return db('users').where({ id }).del()
}

function removeOrg(id){
    return db('organizations').where({ id }).del()
}