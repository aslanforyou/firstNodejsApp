const Rooms = require('../models/rooms');
const Homes = require('../models/homes');
// const homess = require('../models/home-list');


// Rooms.collection.deleteMany();
// //

/*
 function createRoom(req, res){
     let params = req.body;

     Rooms.create({roomName: params.roomName, homeId: params.homeId, userId: req.userId}, function (err, room) {
         if (err) {
          return    console.error('asdasdasdasd');
         }
         HomeModel.update({_id: params.homeId},{$push:{rooms:room._id }})
     });
 }
*/




// Rooms.findOne({roomName: 'Room'}).populate('homeName').exec(function (err, room) {
//     if (err) return handleError(err);
//     // console.log(room.homeName.homeName);
// });

//populate
/*
Homes.find({}).lean().exec(function (err, home) {
    if (err) return handleError(err);
    // console.log(home[1]._id);
    for (let i = 0; i < home.length; i++) {
        Rooms.find({homeName: home[1]._id}).exec(function (err, rooms) {
            if (err) return handleError(err);
            rooms.forEach(function (room) {
                // console.log(room.roomName);
                Homes.updateOne({homeName: home[i].homeName}, {$addToSet: {rooms: room.roomName}}, function (err, raw) {
                    if (err) console.log('error');
                    console.log(raw);
                })
            })
        });
    }
});
*/

/*Homes.updateOne({homeName: 'test_1'}, {$addToSet:{key: "asd"}}, function (err, raw) {
    if (err) console.log('error');
    console.log(raw);
})*/

// Users.updateOne({username: user_name}, {token: token}, function (err, raw) {
//     if (err) return handleError(err);
//     res.json({
//         data: 'yes',
//         token: token
//     })
// });

