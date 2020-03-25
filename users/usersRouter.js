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

                res.status(201).json({username: creds.username, token, user_id: newUser[0]});
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

    const hash = bcrypt.hashSync(orgCreds.password, 12);
    orgCreds.password = hash;
    if (orgCreds.org_name && orgCreds.password && orgCreds.location){
        users.addOrg(orgCreds)
            .then(newOrg => {
                const token = generateToken(newOrg)
                res.status(201).json({organization: orgCreds.org_name, token, org_id: newOrg[0]});
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

                res.status(200).json({username: `${user.username}`, token, id: user.id });                
            } else {
                res.status(401).json({message: 'Invalid Credentials'})
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
})

router.post('/organizations/login', (req, res) => {
    let {org_name, password} = req.body;

    users.findOrgBy({org_name})
        .first()
        .then(org => {
            if (org && bcrypt.compareSync(password, org.password)){
                const token = generateToken(org.id)

                res.status(200).json({organization: `${org.org_name}`, token, id: org.id });                
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

router.get('/saved-campaigns', (req, res) => {
    const { user_id } = req.body
    
    users.findSavedCampaigns( user_id )
        .then(campaigns => {
            res.status(201).json(campaigns)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get saved campaigns'})
        })
})

router.post('/saved-campaigns', (req, res) => {
    const campaign = req.body

    users.addSavedCampaign(campaign)
        .then(campaign_info => {
            res.status(201).json(campaign_info)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to add campaign'})
        })
})

router.delete('/saved-campaigns/:id', (req, res) => {
    const id = req.params.id

    users.removeSavedCampaign(id)
        .then(campaign => {
            res.status(201).json(campaign)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to delete campaign'})
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