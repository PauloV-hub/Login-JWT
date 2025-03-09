const express = require('express');
const router = express.Router();

const linkController = require('../controllers/linkController')

router.get('/', (req, res) => res.render('index', { error: false, body: {}, isAdmin: true }));

router.post('/choice', express.urlencoded({ extended: true }), linkController.Choice);

module.exports = router;