const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('../initial/settings');
const cors = require('cors');
// const timeout = require('connect-timeout');
const passport = require("passport");
/**
 * Will add middleware to the express app.
 * @param {Object} app The express app object.
 */
const middleware = (app) => {
    // app.use(timeout(config.timeout));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/api", bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(passport.initialize());
    require("./passport")(passport);
};

module.exports = middleware;