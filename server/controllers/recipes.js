const Recipe = require('../models/recipe');

module.exports.getAllRecipes = async(req, res, next) => {
    try {
        // await Recipe.addNewRecipe(recipe);

        const recipes = await Recipe.getAllRecipes();

        res.status(200).send(recipes);
    } catch (err) {
        next(err);
    }
};

module.exports.addNewRecipes = async(req, res, next) => {
    try {
        await Recipe.addNewRecipes(req.body);

        res.send({ message: 'Ok' });
    } catch (err) {
        next(err);
    }
};