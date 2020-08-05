const mongoose = require('mongoose');


const ingredientSchema = mongoose.Schema({
    name: {
        type: String
    },
    amount: {
        type: Number
    }
});


const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;