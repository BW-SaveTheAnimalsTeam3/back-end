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

router.get('/:id', (req, res) => {
    const id = req.params.id
    
    campaigns.findById(id)
        .then(campaign => {
            res.status(200).json(campaign);
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.get('/organizations/:id', (req, res) => {
    const id = req.params.id;

    campaigns.findByOrgId(id)
        .then(campaigns => {
            res.status(200).json(campaigns)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body

    campaigns.findById(id)
        .then(campaign => {
            if (campaign){
                campaigns.update(changes, id)
                    .then(updatedCampaign => {
                        res.status(201).json(updatedCampaign)
                    })
            } else {
                res.status(404).json({ errorMessage: 'Could not find campaign to update'})
            }
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id

    campaigns.findById(id)
        .then(campaign => {
            if (campaign){
                campaigns.remove(id)
                    .then(deletedCampaigns => {
                        res.status(201).json(deletedCampaigns)
                    })
                    .catch(error => {
                        res.status(500).json(error)
                    })
            } else {
                res.status(400).json({ errorMessage: 'Could not find campaign to delete'})
            }
        })
})

module.exports = router