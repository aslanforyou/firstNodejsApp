const mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

const homeSchema = new mongoose.Schema({
    homeName: {
        type: String,
        required: true,
    },
    rooms: [{
        type: Schema.Types.ObjectId, ref: 'Rooms'
    }],
    userId: {
        type: Schema.Types.ObjectId, ref: 'Users'
    },
    key: {
        type: String,
    },
});

module.exports = mongoose.model('Homes', homeSchema);