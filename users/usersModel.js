const db = require('../data/dbConfig.js')

module.exports = {
    add,
    addOrg,
    findUsers
}

function add(creds) {
    return db('users').insert(creds)
}

function addOrg(orgCreds){
    return db('organizations').insert(orgCreds)
}

function findUsers(){
    return db('users')
}