const db = require('../data/dbConfig')

module.exports = {
    addUser,
    addOrg
}

function addUser(creds) {
    return db('users').insert(creds)
}

function addOrg(orgCreds){
    return db('organizations').insert(orgCreds)
}