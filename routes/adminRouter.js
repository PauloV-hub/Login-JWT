const express = require('express');
const router = express.Router();

const auth = require('../controllers/authController.js');
const adminController = require('../controllers/adminController.js');

router.get('/', auth, (req, res) => {
    res.send('Bem-vindo à área de administração!');
});

router.get('/register', auth, (req, res) => {
    res.render('register', { error: false, body: {}, isAdmin: true });

});

router.get('/login', (req, res) => {
    const alert = req.query.alert || null;
    res.render('login', { error: false, body: {}, isAdmin: true });
});

router.post('/register', adminController.register);

router.post('/login', adminController.login);

module.exports = router;