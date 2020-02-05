const express = require('express');

const router = express.Router();

const campaigns = require('./campaignsModel.js');

router.post('/createNewCampaign', (req, res) => {
    campaigns.add(req.body)
        .then(campaign => {
            res.status(201).json(campaign);
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.get('/', (req, res) => {
    campaigns.findAll()
        .then(campaigns => {
            res.status(200).json(campaigns);
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

module.exports = router