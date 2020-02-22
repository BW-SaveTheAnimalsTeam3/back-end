const server = require('./server.js');
const request = require('supertest');

describe('GET /', () => {
    it('returns 200 OK', () => {
        return request(server).get('/')
            .expect(200)
    })
})

describe('register route', () => {
    it('sends 500 status if no email and password', () => {
        return request(server)
            .post('/api/users/register')
            .then(res => expect(res.status).toBe(500))
    })

    // it('sends status 201 upon success', () => {
    //     return request(server)
    //         .post('/api/users/register')
    //         .send({ username: 'testTest', password: 'testTest'})
    //         .then(res => expect(res.status).toBe(201))
    // })
})

describe('login route', () => {
    it('sends 500 status if login creds are unregistered', () => {
        return request(server)
            .post('/api/users/login')
            .then(res => expect(res.status).toBe(500))
    })

    it('sends 201 status if login creds are valid', () => {
        return request(server)
            .post('/api/users/login')
            .send({ username: 'testTest', password: 'testTest' })
            .then(res => expect(res.status).toBe(200))
    })
})

describe('get campaigns route', () => {
    it('sends 200 status if success', () => {
        return request(server)
            .get('/api/campaigns/')
            .then(res => expect(res.status).toBe(200))
    })

})