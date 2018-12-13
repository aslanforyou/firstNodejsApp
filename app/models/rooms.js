const mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

const roomSchema = new mongoose.Schema({
    roomName:{
        type: String,
    },
    homeId: {
        type: Schema.Types.ObjectId, ref: 'Homes'
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'Users'
    },
});

module.exports = mongoose.model('Roomes', roomSchema);