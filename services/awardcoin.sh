echo "Installing awardcoin..."
mkdir -p /home/son/Documents/Crypto-API/bin/awardcoin
cd /home/son/Documents/Crypto-API/bin/awardcoin
curl -Lo awardcoin.tar.gz https://github.com/awardprj/AwardCoin/releases/download/v1.0.0.0/awardcoin-1.0.0-x86_64-linux-gnu.tar.gz
tar -xzf awardcoin.tar.gz
find . -name "*awardcoin*" -print0 | xargs -0 -I {} mv {} .
find ./ -name "*.tar.gz" -exec rm -rf {} +
find ./ -type d -name "*awardcoin*" -exec rm -rf {} +

mkdir -p /home/son/Documents/Crypto-API/bin/.awardcoin
sudo cat > /home/son/Documents/Crypto-API/bin/.awardcoin/awardcoin.conf << EOL
rpcport=19915
rpcuser=sha1
rpcpassword=sha1
daemon=1
txindex=1
EOL

sudo cat > /etc/systemd/system/awardcoind.service << EOL
[Unit]
Description=awardcoind
After=network.target
[Service]
Type=forking
User=root
WorkingDirectory=/home/son/Documents/Crypto-API
ExecStart=/home/son/Documents/Crypto-API/bin/awardcoin/awardcoind -datadir=/home/son/Documents/Crypto-API/bin/.awardcoin
ExecStop=/home/son/Documents/Crypto-API/bin/awardcoin/awardcoin-cli -datadir=/home/son/Documents/Crypto-API/bin/.awardcoin stop
Restart=on-abort
[Install]
WantedBy=multi-user.target
EOL

sudo systemctl start awardcoind
sudo systemctl enable awardcoind
echo "Sleeping for 1 hour while node syncs blockchain..."
sleep 1h
clear
