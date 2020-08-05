const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const secret = require('./secret');

const User = require('../models/user');


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

const jwtStrategy = new JwtStrategy(
    options,
    async(jwt_payload, done) => {
        try {
            const user = await User.findOne({ _id: jwt_payload.id });

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    });


module.exports = jwtStrategy;