const db = require('../data/dbConfig.js')

module.exports = {
    addUser,
    addOrg,
    findUsers
}

function addUser(creds) {
    return db('users').insert(creds)
}

function addOrg(orgCreds){
    return db('organizations').insert(orgCreds)
}

function findUsers(){
    return db('users')
}