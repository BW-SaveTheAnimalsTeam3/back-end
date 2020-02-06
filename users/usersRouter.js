const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const users = require('./usersModel.js');
const router = express.Router();



router.post('/register', (req, res) => {
    const creds = req.body;

    const hash = bcrypt.hashSync(creds.password, 12);
    creds.password = hash;
    if (creds.username && creds.password){
        users.add(creds)
            .then(newUser => {
                const token = generateToken(newUser)

                res.status(201).json({token, user_id: newUser});
                })
                .catch(error => {
                    res.status(500).json(error);
                })
    } else {
        res.status(400).json({ errorMessage: 'username and password are required'})
    }
})

router.post('/register/organizations', (req, res) => {
    const orgCreds = req.body;

    if (orgCreds.org_name && orgCreds.user_id){
        users.addOrg(orgCreds)
            .then(newOrg => {
                res.status(201).json({org_id: newOrg});
            })
            .catch(error => {
                res.status(500).json(error);
            })
    } else {
        res.status(400).json({errorMessage: 'organization name and user_id are required'})
    }
})

router.post('/login', (req, res) => {
    let {username, password} = req.body;

    users.findBy({username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user.id)

                users.findOrgById(user.id)
                    .then(org => {
                        res.status(200).json({message: `Welcome ${user.username}!`, token, user_id: org.user_id, org_id: org.id });
                    })
                
            } else {
                res.status(401).json({message: 'Invalid Credentials'})
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
})

router.get('/', (req, res) => {
    users.findAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get users'})
        })
})

router.get('/organizations/', (req, res) => {
    users.findAllOrgs()
        .then(orgs => {
            res.status(200).json(orgs);
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get orgs'})
        })
})

router.get('/organizations/:id', (req, res) => {
    const id = req.params.id

    users.findOrgById(id)
        .then(org => {
            res.status(201).json(org)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    
    users.removeUser(id)
        .then(delUser =>{
            res.status(200).json(delUser)
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'Could not delete user'})
        })
})

router.delete('/organizations/:id', (req, res) => {
    const id = req.params.id
    
    users.removeOrg(id)
        .then(delOrg =>{
            res.status(200).json(delOrg)
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'Could not delete organization'})
        })
})

function generateToken(id){
    const payload = {
        subject: id,
    };
    const secret = 'Secret sauce';
    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secret, options)
}

module.exports = router;