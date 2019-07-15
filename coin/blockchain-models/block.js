const mongoose = require('mongoose');

export class Block {
    constructor(connection){
        this = connection.model('Block', new mongoose.Schema({
            __v: { select: false, type: Number },
            bits: { required: true, type: String },
            confirmations: { required: true, type: Number },
            createdAt: { index: true, required: true, type: Date },
            diff: { required: true, type: String },
            hash: { index: true, required: true, type: String, unique: true },
            height: { index: true, required: true, type: Number },
            merkle: { required: true, type: String },
            nonce: { required: true, type: Number },
            prev: { required: true, type: String },
            size: { type: Number },
            txs: { default: [], required: true, type: [String] },
            ver: { required: true, type: Number }
        }, { versionKey: false }), 'blocks')
    }
}

// function Block(conn) {
//     this.model = conn.model('Block', new mongoose.Schema({
//         __v: { select: false, type: Number },
//         bits: { required: true, type: String },
//         confirmations: { required: true, type: Number },
//         createdAt: { index: true, required: true, type: Date },
//         diff: { required: true, type: String },
//         hash: { index: true, required: true, type: String, unique: true },
//         height: { index: true, required: true, type: Number },
//         merkle: { required: true, type: String },
//         nonce: { required: true, type: Number },
//         prev: { required: true, type: String },
//         size: { type: Number },
//         txs: { default: [], required: true, type: [String] },
//         ver: { required: true, type: Number }
//     }, { versionKey: false }), 'blocks')
// }

// module.exports.Block = Block;