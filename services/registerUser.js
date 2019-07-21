const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require(`../global/models/User`);
const settings = require('../initial/settings');

let email = settings.user.email;
let password = settings.user.password;

User.findOne({email}).then(user => {
    if(user) {
        return res.status(400).json({
            email: 'Email already exists'
        });
    }
    else {
        bcrypt.genSalt(10, (err, salt) => {
            if(err) console.error('There was an error', err);
            else {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err) console.error('There was an error', err);
                    else {
                        const newUser = new User({
                            _id: new mongoose.Types.ObjectId,
                            email,
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