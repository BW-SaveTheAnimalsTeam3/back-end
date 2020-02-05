const db = require('../data/dbConfig.js')

module.exports = {
    add,
    addOrg,
    findAll,
    findBy
}

function add(creds) {
    return db('users').insert(creds)
}

function addOrg(orgCreds){
    return db('organizations').insert(orgCreds)
}

function findAll(){
    return db('users')
}

function findBy(username){
    return db('users').where(username)
}