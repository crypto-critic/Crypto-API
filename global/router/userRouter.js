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
const setupMongoDb = require('../../services/setupMongoDb');
const installCoin = require('../../services/installCoin');
const RPC = require('../../coin/rpc/rpc');

module.exports = (router)=>{
    router.post('/users/login', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({email})
            .then(user => {
                if(!user) {
                    res.status(404).json({status: 'error', message: 'User not found!'});
                    return;
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
                            res.status(400).json({status: 'error', message: 'Password do not match!'});
                        }
                    });
            });
    });

    router.post('/users/get-list', passport.authenticate('jwt', { session: false }),  async (req, res) => {
        let coinId = req.body.coinId;
        let list = await List.find({});
        res.status(200).json(list);
    });

    router.post('/users/insert-coin', passport.authenticate('jwt', { session: false }),  async (req, res) => {
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
                marketId: req.body.marketId || coinId,
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
                    download: req.body.link
                },
                wallet
            });
            res.status(200).json({status: 'success', message: 'insert coin to Db'})
        } else {
            res.status(401).json({status: 'error', message: 'coin already exist!'})
        }
        
    });

    router.post('/users/setup-coin', passport.authenticate('jwt', { session: false }),  async (req, res) => {
        let coinId = req.body.coinId;
        let check = await List.findOne({coinId: coinId});
        if (check.active === false) {
            res.status(200).json({status: 'pending', message: 'setup coin in process'})
            installCoin(coinId, check.links.download, check.wallet.port)
                .then(()=> res.status(200).json({status: 'success', message: 'setup coin success'}))
                .catch(err => res.status(400).json({status: 'error', message: err.message}))
        } else {
            res.status(401).json({status: 'error', message: 'coin already setup!'})
        }
    });

    router.post('/users/test-setup', async (req, res) => {
        let coinId = req.body.coinId;
        let coin = await List.findOne({coinId});
        let config = coin.wallet;
        let rpc = new RPC(config);
        let info = await rpc.call('getinfo');
        res.json({coinId, ...info});
    });

    router.post('/users/enable-sync', passport.authenticate('jwt', { session: false }), async (req, res) => {
        let coinId = req.body.coinId;
        List.findOneAndUpdate({coinId: coinId},{$set: {active: true}}, (err, data)=>{
            if(!err && data)
                {res.status(200).json({status: 'success', message: 'enable sync!'})}
            else 
                {res.status(400).json({status: 'error', message: 'error'})}
        });
    });

    router.post('/users/setup-chain/read-file', passport.authenticate('jwt', { session: false }),  async (req, res) => {
        let coinId = req.body.coinId;
        fs.readFile(path.resolve(indexPath, `initial/${coinId}.chain.js`), 'utf-8', (err, data)=>{
            res.send(data);
        })
    });

    router.post('/users/setupChain/save-file', passport.authenticate('jwt', { session: false }),  async (req, res) => {
        let coinId = req.body.coinId;
        let data = req.body.data;
        fs.writeFile(path.resolve(indexPath, `initial/${coinId}.chain.js`), data, (err)=>{
            if(!err) {res.status(200).json({status: 'success', message: `created ${coinId}.chain.js`})};
        })
    });
};
