
const homeModel = require('../models/homes');
const homess = require ('../models/home-list');
const Users = require ('../models/user');

homeModel.collection.deleteMany();

module.exports.createHome = function (req,res) {
    let homeName = req.body.homeName;

    Users.findOne({username: req.username}).lean().exec(function (err, user) {
        homeModel.create({homeName: homeName, userId: user._id,}, function (err, home) {
            if (err) {
                return console.error('error creating home');
            }
            console.log(home);
        });
    })
};










// for (let i=0;i<homess.length; i++) {
//     console.log(homess[i].homeName);
//
//     Homes.create({homeName: homess[i].homeName, key: i}, function (err, homeNew) {
//         if (err) {
//             console.error('asdasdasdasd');
//         }
//     });
// }

//console.log(Homes);

/*
// homess.forEach(function(home){
//     //console.log(home.homeName);
//
//     Homes.findOneAndUpdate ({ homeName: home.homeName}, {rooms: },function (err, doc) {
//         if (err) ..}
//
//     )
// });
*/

