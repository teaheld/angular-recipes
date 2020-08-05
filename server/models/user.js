const mongoose = require('mongoose'),
    bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


userSchema.statics.getAllUsers = async function() {
    const users = await this.find({}).exec();

    return users;
};


userSchema.statics.getUserById = async function(id) {
    const user = await this.findById(id).exec();

    if (user) {
        return Promise.resolve(user);
    } else {
        return Promise.reject();
    }
};


userSchema.statics.addUser = async function(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this({
        'email': email,
        'password': hashedPassword
    });

    await newUser.save();
};

userSchema.statics.getUserByEmail = async function(email) {
    const user = await this.findOne({ email }).exec();

    return user;
};


userSchema.methods.comparePassword = async function(password) {
    return (await bcrypt.compare(password, this.password) ? true : false);
};


const User = mongoose.model('User', userSchema);

module.exports = User;