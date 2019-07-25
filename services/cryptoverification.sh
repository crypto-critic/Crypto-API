echo "Installing cryptoverification..."
mkdir -p /home/son/Documents/Crypto-API/bin/cryptoverification
cd /home/son/Documents/Crypto-API/bin/cryptoverification
curl -Lo cryptoverification.tar.gz https://github.com/CVCCVerifyCoin/Cryptoverification/releases/download/1.0.0.0/Cryptoverification-1.0.0.0-daemon-ubuntu-16.04.tar.gz
tar -xzf cryptoverification.tar.gz
find . -name "*cryptoverification*" -print0 | xargs -0 -I {} mv {} .
find ./ -name "*.tar.gz" -exec rm -rf {} +
find ./ -type d -name "*cryptoverification*" -exec rm -rf {} +

mkdir -p /home/son/Documents/Crypto-API/bin/.cryptoverification
sudo cat > /home/son/Documents/Crypto-API/bin/.cryptoverification/cryptoverification.conf << EOL
rpcport=1315
rpcuser=sha1
rpcpassword=sha1
daemon=1
txindex=1
EOL

sudo cat > /etc/systemd/system/cryptoverificationd.service << EOL
[Unit]
Description=cryptoverificationd
After=network.target
[Service]
Type=forking
User=root
WorkingDirectory=/home/son/Documents/Crypto-API
ExecStart=/home/son/Documents/Crypto-API/bin/cryptoverification/cryptoverificationd -datadir=/home/son/Documents/Crypto-API/bin/.cryptoverification
ExecStop=/home/son/Documents/Crypto-API/bin/cryptoverification/cryptoverification-cli -datadir=/home/son/Documents/Crypto-API/bin/.cryptoverification stop
Restart=on-abort
[Install]
WantedBy=multi-user.target
EOL

sudo systemctl start cryptoverificationd
sudo systemctl enable cryptoverificationd
echo "Sleeping for 1 hour while node syncs blockchain..."
sleep 1h
clear
