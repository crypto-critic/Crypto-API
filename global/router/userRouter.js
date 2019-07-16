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

module.exports = (router)=>{
    // router.post('/users/register', async (req, res) => {
    //     User.findOne({
    //         email: req.body.email
    //     }).then(user => {
    //         if(user) {
    //             return res.status(400).json({
    //                 email: 'Email already exists'
    //             });
    //         }
    //         else {
    //             bcrypt.genSalt(10, (err, salt) => {
    //                 if(err) console.error('There was an error', err);
    //                 else {
    //                     bcrypt.hash(req.body.password, salt, (err, hash) => {
    //                         if(err) console.error('There was an error', err);
    //                         else {
    //                             const newUser = new User({
    //                                 _id: new mongoose.Types.ObjectId,
    //                                 email: req.body.email,
    //                                 password: hash,
    //                             });
    //                             newUser
    //                                 .save()
    //                                 .then(user => {
    //                                     res.json(user)
    //                                 });
    //                         }
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // });

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
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`
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

    router.post('/users/insert_coin', passport.authenticate('jwt', { session: false }), async (req, res) => {
        let id = req.body.id;
        let check = await List.findOne({coinId: id});
        if (check === null) {
            let wallet = {
                host : 'localhost',
                port: parseInt(req.body.port),
                user: settings.dbsettings.user,
                pass: settings.dbsettings.password,
                timeout: 8000
            };
            let base = {
                name: req.body.name || id,
                symbol: req.body.symbol || id,
                category: req.body.category || 'masternode',
                active: req.body.active || true,
                links: {
                    homepage: [req.body.homepage || null],
                    annoucement: [req.body.annoucement || null],
                }
            };
            let data = JSON.stringify(Object.assign({id, wallet, base}));
            let destination = path.resolve(indexPath, `initial/${id}.json`);
            await fs.writeFileSync(destination, data);
            await List.create({
                coinId: id,
                name: req.body.name || id,
                active: req.body.active || true,
                category: req.body.category || 'masternode'
            });
            res.status(401).json({status: 'success', message: 'uploaded'})
        } else {
            res.status(401).json({status: 'error', message: 'coin already exist!'})
        }

    });
};
