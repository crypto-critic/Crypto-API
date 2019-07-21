const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');
const User = require(`../models/User`);
const List = require('../models/ListCoin');
const settings = require('../../initial/settings');
const fs = require('fs');
const path = require('path');
const indexPath = fs.realpathSync(process.cwd());
const setupMongoDb = require('../../services/mongo-setup');
const setupCoin = require('../../services/coin-setup');

module.exports = (router)=>{
    router.post('/users/register', async (req, res) => {
        User.findOne({
            email: req.body.email
        }).then(user => {
            if(user) {
                return res.status(400).json({
                    email: 'Email already exists'
                });
            }
            else {
                bcrypt.genSalt(10, (err, salt) => {
                    if(err) console.error('There was an error', err);
                    else {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            if(err) console.error('There was an error', err);
                            else {
                                const newUser = new User({
                                    _id: new mongoose.Types.ObjectId,
                                    email: req.body.email,
                                    password: hash,
                                });
                                newUser
                                    .save()
                                    .then(user => {
                                        res.json(user)
                                    });
                            }
                        });
                    }
                });
            }
        });
    });

    router.post('/users/login', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({email})
            .then(user => {
                if(!user) {
                    errors.email = 'User not found';
                    return res.status(404).json(errors);
                }
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                _id: user._id,
                                email: user.email,
                            };
                            jwt.sign(payload, 'pinokarahere', {
                                expiresIn: 36000
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `${settings.vpsIndex} ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
            });
    });

    router.post('/users/insert_coin', passport.authenticate('jwt', { session: false }),  async (req, res) => {
        let coinId = req.body.coinId;
        let check = await List.findOne({coinId: coinId});
        if (check === null) {
            await setupMongoDb(coinId);
            let wallet = {
                host : 'localhost',
                port: parseInt(req.body.port),
                user: settings.dbsettings.user,
                pass: settings.dbsettings.password,
                timeout: 8000
            };
            await List.create({
                coinId,
                name: req.body.name || coinTd,
                active: false,
                category: req.body.category || 'masternode',
                symbol: req.body.symbol || coinId,
                links: {
                    homepage: [req.body.homepage || null],
                    annoucement: [req.body.annoucement || null],
                    discord: [req.body.discord || null],
                    twitter: [req.body.twitter || null],
                    telegram: [req.body.telegram || null],
                    facebook: [req.body.facebook || null],
                    youtube: [req.body.youtube || null],
                    explorer: [req.body.explorer || null],
                    github: [req.body.github || null],
                    reddit:[req.body.reddit || null],
                },
                wallet
            });
            setupCoin(coinId, req.body.link, req.body.port).then(()=>{
                console.log('ok')
                List.update({coinId},{$set: {active: true}}, (err)=>{
                    if (err) {res.status(401).json({status: 'error', message: ''})};
                    res.status(401).json({status: 'success', message: 'uploaded'})
                });
            })
        } else {
            res.status(401).json({status: 'error', message: 'coin already exist!'})
        }

    });
};
