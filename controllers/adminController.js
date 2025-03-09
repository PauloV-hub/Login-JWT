const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { loginValidate, registerValidate } = require('./validate');

const adminController = {
    register: async function (req, res) {
        const { error } = registerValidate(req.body);
        if (error) {
            return res.render('register', { error: error.details[0].message, body: req.body, isAdmin: true });
        }

        const selectedUser = await User.findOne({ email: req.body.email });
        if (selectedUser) {
            return res.render('register', { error: 'Email já existe', body: req.body, isAdmin: true });
        }

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            admin: true,
        });

        try {
            await user.save();
            res.redirect('/admin/login');
        } catch (error) {
            res.render('register', { error: 'Erro ao registrar: ' + error.message, body: req.body, isAdmin: true });
        }
    },

    login: async function (req, res) {
        const { error } = loginValidate(req.body);
        if (error) {
            return res.render('login', { error: error.details[0].message, body: req.body, isAdmin: true });
        }

        const selectedUser = await User.findOne({ email: req.body.email, admin: true });
        if (!selectedUser) {
            return res.render('login', { error: 'Email ou senha incorretos', body: req.body, isAdmin: true });
        }

        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password);
        if (!passwordAndUserMatch) {
            return res.render('login', { error: 'Email ou senha incorretos', body: req.body, isAdmin: true });
        }

        const token = jwt.sign(
            { _id: selectedUser.id, admin: selectedUser.admin },
            process.env.TOKEN_SECRET, { expiresIn: '1m' }
        );

        req.session.token = token;

        return res.redirect('/admin');
    }
};

module.exports = adminController;