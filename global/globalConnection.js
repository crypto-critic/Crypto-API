const Connection = require('../coin/connection');
const GlobalConnection = new Connection('global').connection;
module.exports = GlobalConnection;