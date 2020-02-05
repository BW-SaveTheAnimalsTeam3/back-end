const express = require('express');

const router = express.Router();

const donations = require('./donationsModel.js');

router.post('/', (req, res) => {
    const details = req.body;

    donations.add(details)
        .then(donation => {
            res.status(201).json(donation)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.get('/', (req, res) => {
    donations.findAll()
        .then(donations => {
            res.status(201).json(donations)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

modules.export = router