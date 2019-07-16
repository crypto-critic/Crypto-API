const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GlobalConnection = require('../globalConnection');

const UserSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});
const User = GlobalConnection.model('users', UserSchema);
module.exports = User;