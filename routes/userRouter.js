
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { error } = require('@hapi/joi/lib/base');
const { register } = require('../controllers/adminController');

router.get('/register', (req, res) => { res.render('register', { error: false, body: {}, isAdmin: false }) });
router.get('/login', (req, res) => { res.render('login', { error: false, body: {}, isAdmin: false }) });

router.post('/register', userController.register);

router.post('/login', userController.login);


module.exports = router