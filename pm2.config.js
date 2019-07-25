const pm2Config = {
    "apps": [
      {
        "name": "app",
        "script": "./server/index.js",
        "exec_mode": "cluster_mode",
        "instances": 1,
        "watch": true
      },
      {
        "name": "cronJob",
        "script": "./services/cronJobs.js",
        "instances": 2,
        "watch": true
      }
    ]
};

module.exports = pm2Config;