const mongoose = require('mongoose');


const connectToDB = (db = 'angular-recipes') => {
    mongoose.connect(`mongodb://localhost:27017/${db}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log(`Connected to the database ${db}`))
        .catch(error => {
            console.error(err);
            process.exit(1);
        });
};


module.exports = connectToDB;