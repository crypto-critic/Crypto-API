var mongoose = require('mongoose');

class Peer {
    constructor(connection) {
      this.model = connection.model('Peer', new mongoose.Schema({
        __v: { select: false, type: Number },
        _id: { required: true, select: false, type: String },
        country: { type: String },
        countryCode: { type: String },
        createdAt: { index: true, required: true, type: Date },
        ip: { index: true, required: true, type: String },
        lat: { type: String },
        lon: { type: String },
        port: { type: Number },
        subver: { required: true, type: String },
        timeZone: { type: String },
        ver: { required: true, type: Number }
      }, { versionKey: false }), 'peers')
    }
}

module.exports = Peer;