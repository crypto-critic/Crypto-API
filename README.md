<h1 align="center">
  <a href="https://api.cryptocritic.live">
    Crypto API
  </a>
</h1>

<p align="center">
  <strong>Multiple cryptocurrency Block explorer && Market Data in same server</strong>
</p>

<p align="center">
  <a href="https://github.com/pinokara/Crypto-API/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Crypto API is released under the MIT license." />
  </a>
  <a href="https://circleci.com/gh/pinokara/Crypto-API">
    <img src="https://circleci.com/gh/facebook/react-native.svg?style=shield" alt="Current CircleCI build status." />
  </a>
</p>

## Contents

- [Requirements](#-requirements)
- [Building](#-building)
- [License](#-license)


## 📋 Requirements

This repo assumes `git`, `mongodb`, `node`, `yarn`, and are installed with configuration done.  Please adjust commands to your local environment. 

Download links:

https://docs.mongodb.com/manual/administration/install-on-linux/

https://nodejs.org/en/download/package-manager/

https://yarnpkg.com/lang/en/docs/install/


## 🎉 Building
#### Clone repository

`git clone https://github.com/crypto-critic/Crypto-API.git` - copy repo to local folder.

`cd Crypto-API` - change into project directory.

`chmod 777 ./shell-scrips/install.sh && ./shell-scrips/install.sh` - Install Node, Mongodb, Pm2, Install package and start

#### Cryptocurrency Configuration
`./initial` - Directory of initial cryptocurrency

`./initial/${cryptocurrency}chain.js` - settings of specificial cryptocurrency blockchain

#### CronJobs

` Node-cron ` Built In cron-tab

## 📄 License

Crypto Api is MIT licensed, as found in the [LICENSE][l] file.

[l]: https://github.com/crypto-critic/Crypto-API/blob/master/LICENSE
