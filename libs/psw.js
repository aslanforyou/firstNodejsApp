const bcrypt = require('bcrypt-nodejs');
const Users = require('../app/models/user');

function passwordCheck(req, res, next) {
    Users.findOne({username: req.body.username}, function (error, user) {
        if (error) {
            console.log('...error finding user');
            return res.status(422).send({
                message: 'user finding error'
            });
        }
        if (user == null) {
            console.log('no user found');
            return res.send('no');
        }
        if (!(bcrypt.compareSync(req.body.password, user.password))) {
            console.log('no password match');
            return res.send('wrong psw');
        }
        next();
    });
}

function passwordCreate(req, res, next) {
    var password = req.body.password;
    if (!password) {
        console.log('Empty password');
        return res.status(422).send({message: 'Enter password!'});
    }
    req.password = bcrypt.hashSync(password);
    next();
}

module.exports = {
    pswCheck: passwordCheck,
    pswCreate: passwordCreate
};
