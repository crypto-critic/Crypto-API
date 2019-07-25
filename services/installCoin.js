//This function setup wallet daemon
const util = require('util');
const spawn = util.promisify(require('child_process').spawn);
const fs = require('fs');
const path = require('path');
const indexPath = fs.realpathSync(process.cwd());
const settings = require('../initial/settings');

const setupCoin = async (coinId, coinLink, rpcPort) => {
    let destination = path.resolve(indexPath, `services/${coinId}.sh`);
    let data = 
    `echo "Installing ${coinId}..."\n`
    + `mkdir -p ${indexPath}/bin/${coinId}\n`
    + `cd ${indexPath}/bin/${coinId}\n`
    + `curl -Lo ${coinId}.tar.gz ${coinLink}\n`
    + `tar -xzf ${coinId}.tar.gz\n`
    + `find . -name "*${coinId}*" -print0 | xargs -0 -I {} mv {} .\n`
    + `find ./ -name "*.tar.gz" -exec rm -rf {} +\n`
    + `find ./ -type d -name "*${coinId}*" -exec rm -rf {} +\n`
    + `\n`
    + `mkdir -p ${indexPath}/bin/.${coinId}\n`
    + `sudo cat > ${indexPath}/bin/.${coinId}/${coinId}.conf << EOL\n`
    + `rpcport=${rpcPort}\n`
    + `rpcuser=${settings.dbsettings.user}\n`
    + `rpcpassword=${settings.dbsettings.password}\n`
    + `daemon=1\n`
    + `txindex=1\n`
    + `EOL\n`
    + `\n`
    + `sudo cat > /etc/systemd/system/${coinId}d.service << EOL\n`
    + `[Unit]\n`
    + `Description=${coinId}d\n`
    + `After=network.target\n`
    + `[Service]\n`
    + `Type=forking\n`
    + `User=root\n`
    + `WorkingDirectory=${indexPath}\n`
    + `ExecStart=${indexPath}/bin/${coinId}/${coinId}d -datadir=${indexPath}/bin/.${coinId}\n`
    + `ExecStop=${indexPath}/bin/${coinId}/${coinId}-cli -datadir=${indexPath}/bin/.${coinId} stop\n`
    + `Restart=on-abort\n`
    + `[Install]\n`
    + `WantedBy=multi-user.target\n`
    + `EOL\n`
    + `\n`
    + `sudo systemctl start ${coinId}d\n`
    + `sudo systemctl enable ${coinId}d\n`
    + `echo "Sleeping for 1 hour while node syncs blockchain..."\n`
    + `sleep 1h\n`
    + `clear\n`;
    await fs.writeFile(destination, data, 'utf8', (err)=>{
        fs.chmod(destination, 0777)
    });
    await spawn(`bash`, [`${destination}`], {
        cwd: process.cwd(),
        detached: true,
        stdio: 'inherit'
    })
};

module.exports = setupCoin;
