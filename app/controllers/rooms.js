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


       Rooms.updateOne({_id:roomId}, {roomName}, function (err, raw) {
           if (err) console.log('error updating room');
           // console.log(roomId);
           if (raw.n) {
               res.send('yes');
           }
           else {
               Rooms.create({roomName: roomName, homeId: homeId, userId: req.userId}, function (err, room) {
                   if (err) {
                       res.send('home first');
                       return console.error('error creating room');
                   }
                   res.send(room._id);
                   homeModel.update({_id: homeId}, {$addToSet: {rooms: room._id}}, function (err, raw) {
                       if (err) return handleError(err);
                       console.log('The raw response from Mongo was ', raw);

                   })
               });
           }

       });

 };

module.exports.getRoom = function(req, res){

    Rooms.find({ homeId: req.body.homeId})
        .exec(function (err, rooms) {
            if (err) {
                return res.send("error finding home");
            }

            res.send(rooms)
        });

};

module.exports.deleteRoom = function (req, res) {

    let roomId = req.body.roomId;
    console.log(roomId);
    if (roomId) {
        Rooms.deleteOne({_id: roomId}, function (error, room) {
            if (error) {
                console.log('Error on delete');
                res.send('err');
            }
            if (room) {
                homeModel.updateOne({rooms: roomId}, {$pull: {rooms: roomId}}, function (err, raw) {
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', raw);
                });
                res.send('deleted')
            }

        })
    }
};