import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService) { }
  private readonly recipesUrl = 'http://localhost:3000/recipes';

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    return this.http.put(this.recipesUrl, recipes);
  }

  fetchRecipes() {
    this.http.get<Recipe[]>(this.recipesUrl)
      .subscribe((recipe) => {
        this.recipeService.setRecipes(recipe);
      });
  }
}
