const List = require('./models/ListCoin');
const Coin = require('../coin/coin');

const getList = async () => {
    data = await List.find({active: true});
    console.log(data);
    let ListCoin = await data.map(data => new Coin(data));
    return ListCoin;
}
module.exports = getList;