const jwt = require('jsonwebtoken'),
    secret = require('../configurations/secret');

const User = require('../models/user');

const emailExists = require('../middlewares/email-exists'),
    invalidData = require('../middlewares/invalid-data');


module.exports.registerUser = [
    async(req, res, next) => {
        try {
            let user = await User.getUserByEmail(req.body.email);

            if (!user) {
                user = await User.addUser(req.body.email, req.body.password);

                // Automatically login in user 
                // If one is created
                const token = jwt.sign({ id: user._id, email: user.email },
                    secret, { expiresIn: 3600 });

                res.status(201).send({ id: user._id, email: user.email, token, expiresIn: +jwt.decode(token).exp * 1000 });
            } else {
                next();
            }
        } catch (error) {
            next(error);
        }
    },

    emailExists
];


module.exports.loginUser = [
    async(req, res, next) => {
        try {
            const user = await User.getUserByEmail(req.body.email);

            if (user) {
                if (await user.comparePassword(req.body.password)) {
                    const token = jwt.sign({ id: user._id, email: user.email },
                        secret, { expiresIn: 3600 });

                    res.send({ id: user._id, email: user.email, token, expiresIn: +jwt.decode(token).exp * 1000 });
                } else {
                    next();
                }
            } else {
                next();
            }
        } catch (err) {
            next(err);
        }
    },

    invalidData
];