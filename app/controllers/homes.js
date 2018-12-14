
const homeModel = require('../models/homes');
const homess = require ('../models/home-list');
const Users = require ('../models/user');

// homeModel.collection.deleteMany();

module.exports.createHome = function (req,res) {
    let homeName = req.body.homeName;
    let homeId = req.body.homeId;
    if (homeId) {
        homeModel.updateOne({_id:homeId}, {homeName}, function (err, raw) {
            if (err) console.log('error');
            console.log(raw);

            res.send('yes');
        });
    }
    else {
        homeModel.create({homeName: homeName, userId: req.userId,}, function (err, home) {
            if (err) {
                return console.error('error creating home');
            }
            res.send(home._id);
        });
    }
};


module.exports.getHome = function(req, res){
    homeModel.find({ userId: req.userId})
        .exec(function (err, homes) {
        if (err) {
            return res.send("error finding home");
        }
            res.json({
              homes
            });
    });

};

module.exports.deleteHome = function (req, res) {

    let homeId = req.body.homeId;
    console.log(homeId);

    homeModel.deleteOne({_id: homeId}, function (error, home) {
        if (error) {
            console.log('Error on delete');
            res.send('err');
        }
        if (home) {
            console.log(home);
            res.send('deleted')
        }
    })

};