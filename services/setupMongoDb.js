//This function create user to access mongodb
const util = require('util');
const spawn = require('child_process').spawn;
const fs = require('fs');
const path = require('path');
const indexPath = fs.realpathSync(process.cwd());
const settings = require('../initial/settings');

const setupMongoDb = async (coin) => {
    let destination = path.resolve(indexPath, `services/mongo.js`);
    let data = `db.createUser( { user: "${settings.dbsettings.user}", pwd: "${settings.dbsettings.password}", roles: [ "readWrite" ] } );`;
    await fs.writeFile(destination, data, 'utf8', (err)=>{console.log(err)});
    spawn('mongo', [`localhost:27017/${coin}`, `${destination}`], {stdio: 'inherit'})
};
module.exports = setupMongoDb;