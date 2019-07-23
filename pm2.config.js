const pm2Config = {
    "apps": [
      {
        "name": "app",
        "script": "./server/index.js",
        "exec_mode": "cluster_mode",
        "instances": "max"
      },
      {
        "name": "cronJob",
        "script": "./services/cronJobs.js",
        "instances": 2
      }
    ]
};

module.exports = pm2Config;