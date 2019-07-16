const List = require('./models/ListCoin');
const fs = require('fs');
const path = require('path');
const indexPath = fs.realpathSync(process.cwd());

const getList = async ()=>{
    let ListOfCoin = await List.find({});
    let ListCoin = ListOfCoin.map(coin => {
        let destination = path.resolve(indexPath, `initial/${coin.coinId}.json`);
        let rawData = fs.readFileSync(destination);
        let data = JSON.parse(rawData);
        return data;
    });
    return ListCoin;
};

module.exports = getList;