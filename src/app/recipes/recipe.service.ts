import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { EventHandlerVars } from '@angular/compiler/src/compiler_util/expression_converter';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Schnitzel', 'Love it', 'https://p0.pxfuel.com/preview/318/594/539/schnitzel-wiener-schnitzel-eat-breading.jpg',
    [ new Ingredient('Meat', 3), new Ingredient('Flour', 1), new Ingredient('Egg', 3), new Ingredient('Bread crumb', 500)]),
    new Recipe('Pizza', 'My first love', 'https://c.pxhere.com/photos/c3/59/photo-1615696.jpg!d',
    [ new Ingredient('Flour', 1), new Ingredient('Yeast', 1), new Ingredient('Salt', 1), new Ingredient('Cheese', 1), new Ingredient('Tomato', 3)])
  ];

  constructor() { }

  getRecipes() {
    // This way you can't change the array
    return this.recipes.slice();
  }
}
