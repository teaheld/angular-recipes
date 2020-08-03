import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Schnitzel', 'Love it', 'https://p0.pxfuel.com/preview/318/594/539/schnitzel-wiener-schnitzel-eat-breading.jpg'),
    new Recipe('Pizza', 'My first love', 'https://c.pxhere.com/photos/c3/59/photo-1615696.jpg!d')
  ];

  @Output() recipeWasSelcted = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelcted.emit(recipe);
  }
}
