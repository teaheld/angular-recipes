const jwt = require('jsonwebtoken'),
    secret = require('../configurations/secret');

const User = require('../models/user');


module.exports.registerUser = [
    async(req, res, next) => {
        try {
            const user = await User.getUserByEmail(req.body.email);

            if (!user) {
                await User.addUser(req.body.email, req.body.password);

                res.status(201).send({ msg: 'User saved' });
            } else {
                res.status(400).send();
            }
        } catch (error) {
            next(error);
        }
    }
];


module.exports.loginUser = [
    async(req, res, next) => {
        try {
            const user = await User.getUserByEmail(req.body.email);

            if (user) {
                if (await user.comparePassword(req.body.password)) {
                    const token = jwt.sign({ id: user._id, email: user.email },
                        secret, { expiresIn: '1h' });

                    res.send({ msg: 'You are now logged in', token: token, expiresIn: 3600 * 1000 });
                } else {
                    res.status(200).send({ msg: 'Incorrect email or password' });
                }
            } else {
                res.status(200).send({ msg: 'Incorrect email or password' });
            }
        } catch (err) {
            next(err);
        }
    }
];