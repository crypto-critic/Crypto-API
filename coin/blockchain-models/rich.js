const mongoose = require('mongoose');

class Rich{
  constructor(connection) {
    this.model = connection.model('Rich', new mongoose.Schema({
      __v: { select: false, type: Number },
      address: { index: true, required: true, type: String, unique: true },
      value: { default: 0.0, index: true, required: true, type: Number }
    }, { versionKey: false }), 'richs')
  }
}

module.exports = Rich;