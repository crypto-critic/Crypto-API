const mongoose = require('mongoose');

class CoinX {
    constructor(connection){
        this.model = connection.model('Coin', new mongoose.Schema({
            __v: { select: false, type: Number },
            blocks: { required: true, type: Number },
            btc: { required: true, type: Number },
            cap: { required: true, type: Number },
            createdAt: { index: true, required: true, type: Date },
            diff: { required: true, type: Number },
            mnsOff: { required: true, type: Number },
            mnsOn: { required: true, type: Number },
            netHash: { required: true, type: Number },
            peers: { required: true, type: Number },
            status: { required: true, type: String },
            supply: { required: true, type: Number },
            activewallets: { required: false, type: Number },
            usd: { required: true, type: Number }
        }, { versionKey: false }), 'coins')
    }
}

module.exports = CoinX;