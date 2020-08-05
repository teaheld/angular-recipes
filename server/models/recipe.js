const mongoose = require('mongoose');


const recipeSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    imagePath: {
        type: String
    },
    ingredients: [{
        name: {
            type: String
        },
        amount: {
            type: Number
        }
    }]
});


recipeSchema.statics.addNewRecipe = async function(recipe) {
    const newRecipe = new this(recipe);

    await newRecipe.save();
};


recipeSchema.statics.addNewRecipes = async function(recipes) {
    await this.insertMany(recipes);
}


recipeSchema.statics.getAllRecipes = async function() {
    const recipes = await this.find({}).exec();

    return recipes;
};

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;