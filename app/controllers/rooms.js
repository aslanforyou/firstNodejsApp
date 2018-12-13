const Rooms = require('../models/rooms');
const homeModel = require('../models/homes');
const Users = require ('../models/user');
// const homess = require('../models/home-list');


// Rooms.collection.deleteMany();
// //

module.exports.createRoom = function(req, res){
     // let params = req.body;

    let roomName = req.body.roomName;
    let homeId = req.body.homeId;
    let roomId = req.body.roomId;

    if (roomId) {
       Rooms.updateOne({_id:roomId}, {roomName}, function (err, raw) {
           if (err) console.log('error');
           console.log(raw);
       });
    }
     else {
        Rooms.create({roomName: roomName, homeId: homeId, userId: req.userId}, function (err, room) {
            if (err) {
                return console.error('asdasdasdasd');
            }
            homeModel.update({_id: homeId}, {$addToSet: {rooms: room._id}}, function (err, raw) {
                if (err) return handleError(err);
                console.log('The raw response from Mongo was ', raw);
            })
        });
     }
 };

module.exports.getRoom = function(req, res){
    console.log(req);


    Rooms.find({ homeId: req.body.homeId})
        .exec(function (err, rooms) {
            if (err) {
                return handleError(err);
            }
            console.log(rooms);

            res.send(rooms)
        });

};