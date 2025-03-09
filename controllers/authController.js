const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.session.token;
    if (!token) {
        return res.render('login', { error: 'Token invalido ou expirado!', body: req.body, isAdmin: true });

    }

    try {
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = userVerified;
        next();
    } catch (error) {
        return res.render('login', { error: 'Token invalido ou expirado!', body: req.body, isAdmin: true });
    }
};