const Users = require('../app/models/user');

function userId(req, res, next) {

    Users.findOne({username: req.username}).lean().exec(function (err, user) {

        req.userId = user._id;
        // console.log(user._id);
    });
    next();
}

module.exports = {
    userId: userId,
};
