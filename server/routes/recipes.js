const express = require('express'),
    router = express.Router();

const controller = require('../controllers/recipes');


router.get('/', controller.getAllRecipes);
router.put('/', controller.addNewRecipes);


module.exports = router;