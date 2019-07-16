//This function create user to access mongodb

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const indexPath = fs.realpathSync(process.cwd());
const settings = require('../initial/settings');

const setupMongoDb = async (coin) => {
    let destination = path.resolve(indexPath, `shell-scripts/mongo/${coin}.js`);
    let data = `db.createUser( { user: "${settings.dbsettings.user}", pwd: "${settings.dbsettings.password}", roles: [ "readWrite" ] } );`;
    await fs.writeFile(destination, data, 'utf8');
    let ls = spawn('mongo', [`localhost:27017/${coin}`, `${destination}`]);
    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
};

module.exports = setupMongoDb;