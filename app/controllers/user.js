const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');

module.exports.getUser = function (req, res,next) {

    Users.findOne({username: req.username}, function (error, user) {
        if (error) {
            console.log('....');
        }
        res.send({
            username: user.username,
            age: user.age,
            gender: user.gender,
        })
    })
};
module.exports.loginUser = function (req, res) {
    var user_name = req.body.user;
    var password = req.body.password;

    Users.findOne({username: user_name}, function (error, user) {
        if (error) {
        }
        if (user == null) {
            res.send('no');
        }
        else {
            if (bcrypt.compareSync(password, user.password)) {

                var token = jwt.sign({ username: user_name }, 'supersecret', {
                    expiresIn: 86400 // expires in 24 hours
                });
                Users.updateOne({username: user_name}, {token: token}, function (err, raw) {
                    if (err) return handleError(err);
                    res.json({
                        data: 'yes',
                        token: token})
                });
            }
            else {
                res.send('wrong psw');
            }
        }
    });
};

module.exports.createUser = function (req, res) {
    var user_name = req.body.user;
    var password = req.body.password;
    var gender = req.body.gender;
    var age = req.body.age;

    if (!gender) {gender = 'не указан'};
    if (!age) {age = 'не указан'};

    bcrypt.hash(password, null, null, function(err, hash) {
        password = hash;
    });

    Users.findOne({username: user_name}, function (error, user) {
        if (error) {
        }
        if (user == null) {

            var userNew = new Users({username: user_name, password: password, age: age, gender: gender});
            userNew.save(function (err, userNew) {
                if (err) return console.error(err);

            });

            res.json({
                data: 'yes',
            })
        }
        else {
            Users.updateOne({username: user_name}, {password: password, age: age, gender: gender}, function (err, raw) {
                if (err) return handleError(err);
                console.log('The raw response from Mongo was ', raw);

                res.json({
                    data: 'exists',
                })
            });
        }
    });
};
module.exports.saveUser = function (req, res) {
    var username = req.body.username;
    var token = req.body.token;
    var gender = req.body.gender;
    var age = req.body.age;

    Users.findOneAndUpdate({ token: token }, { username,gender,age } , { new: true }, function(err, doc) {
        res.send('Ok!')
    });
};
module.exports.saveUserpsw = function (req, res){
var token = req.body.token;
var newpassword = req.body.newpassword;

bcrypt.hash(newpassword, null, null, function(err, hash) {
    newpassword = hash;
    //  console.log(newpassword);
    Users.findOneAndUpdate({token: token}, {password: newpassword}, {new: true}, function (err, doc) {
        res.send('Ok!')
    });
});
};
module.exports.deleteUser = function (req, res){
    Users.deleteOne({token: req.query.token}, function (error, user) {
        if (error) {
        }
        res.send('deleted')
    })
};