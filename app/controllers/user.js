const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');
const config = require('../../config/config');

module.exports.getUser = function (req, res, next) {
    Users.findOne({username: req.username}, function (error, user) {
        if (error) {
            console.log('...error getting user');
        }
        if (user) {
            res.send({
                username: user.username,
                age: user.age,
                gender: user.gender,
            })
        }
        else {
            res.send("Can't find user!");
            console.log('error finding user');
        }
    })
};

module.exports.loginUser = function (req, res) {
    var user_name = req.body.username;
    var password = req.body.password;

    Users.findOne({username: user_name}, function (error, user) {
        if (error) {
        }
        if (user == null) {
            res.send('no');
        }
        else {
            if (bcrypt.compareSync(password, user.password)) {

                var token = jwt.sign({username: user_name}, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                Users.updateOne({username: user_name}, {token: token}, function (err, raw) {
                    if (err) return handleError(err);
                    res.json({
                        data: 'yes',
                        token: token
                    })
                });
            }
            else {
                res.send('wrong psw');
            }
        }
    });
};

module.exports.createUser = function (req, res) {
    var user_name = req.body.username;
    var password = req.body.password;
    var gender = req.body.gender;
    var age = req.body.age;

    if (!gender) {
        gender = 'не указан'
    }
    if (!age) {
        age = '0'
    }

    password = bcrypt.hashSync(password);

    Users.updateOne({username: user_name}, {password: password, age: age, gender: gender}, function (err, raw) {
        if (err) return handleError(err);

        if (raw.n === 0) {
            Users.create({username: user_name, password: password, age: age, gender: gender},function (err, userNew) {
                if (err) {
                    console.error(err);
                    return res.status(500).send({
                    message: 'Wrong data to create user',
                });}

                res.json({data: 'yes',});
            });
        }
        else {
            res.json({data: 'exists',});
        }
    });
};

module.exports.saveUser = function (req, res) {

    let forSave = {
        username: req.body.username,
        gender: req.body.gender,
        age: req.body.age,
    };

    if (!forSave.username) {
        return res.status(422).send({
            message: 'No user sent'
        });
    }

    let token = jwt.sign({username: forSave.username}, config.secret, {
        expiresIn: 86400 // expires in 24 hours
    });

    forSave.token = token;
    Users.updateOne({username: req.username}, forSave, function (err, doc) {
        if (err) {
            console.log('error updating user');
            return res.status(500).send({
                message: 'User not updated'
            });
        }
        console.log(doc);
        if (doc.n) {
            console.log('Ok updating user');
            res.send({
                token: token,
                username: forSave.username,
            })
        }
        else {
            console.log('Wrong token');
            return res.status(422).send({message: 'User not found'});
        }
    });
};

module.exports.saveUserpsw = function (req, res) {
    var newpassword = req.body.newpassword;

    if (newpassword) {
        bcrypt.hash(newpassword, null, null, function (err, hash) {
            newpassword = hash;
            Users.updateOne({username: req.username}, {password: newpassword}, {new: true}, function (err, doc) {
                if (err) {
                    res.send('not updated')
                }
                if (doc.n){
                    console.log('Ok updating password');
                    res.send('ok');
                }
                else {
                    console.log('Wrong data');
                    return res.status(422).send({message: 'Password not updated'});
                }
            });
        });
    }
    else {
        console.log('Empty password');
        return res.status(422).send({message: 'Enter password!'});
    }
};

module.exports.deleteUser = function (req, res) {
    Users.deleteOne({username: req.username}, function (error, user) {
        if (error) {
            console.log('Error on delete');
            res.send('err');
        }
        if (user){
            console.log(user);
        res.send('deleted')}
    })
};

module.exports.deleteAll = function (req, res) {
    Users.collection.deleteMany();
    res.send('all users deleted');
};