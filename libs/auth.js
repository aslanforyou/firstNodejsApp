const jwt = require('jsonwebtoken');
const config = require('../config/config');

function VerifyToken(req, res, next) {

    var token = req.query.token;

    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'expired' });
        req.username = decoded.username;
        next();
    });
}
module.exports = {
    bearerAuth: VerifyToken
};