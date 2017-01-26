import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';

import { AuthService } from '../shared/auth.service';

declare var firebase: any;

@Injectable()
export class RecipeService {
	recipesChanged = new EventEmitter<Recipe[]>();
	private recipes: Recipe[] = [
		new Recipe('Schnitzel', 'Basic Recipe. Very tasty', 'http://images.derberater.de/files/imagecache/456xXXX_berater/berater/slides/WienerSchnitzel.jpg', [
			new Ingredient('French Fries', 2),
			new Ingredient('Pork Meat', 1)
		]),
		new Recipe('Summer Salad', 'Basic Recipe. Okayish', 'http://ohmyveggies.com/wp-content/uploads/2013/06/the_perfect_summer_salad.jpg', [])
	];
	constructor(private http: Http, private authService: AuthService) { }

	getRecipes() {
		return this.recipes;
	}

	getRecipe(id: number) {
		return this.recipes[id];
	}

	deleteRecipe(recipe: Recipe) {
		this.recipes.splice(this.recipes.indexOf(recipe), 1);
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
	}

	editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
		this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
	}

	initData() {
		const userId = firebase.auth().currentUser.uid;
		firebase.database().ref(userId).once('value').then((snapshot) => {
			if (!snapshot.exists()) {
				firebase.database().ref(userId).set({
					recipes: this.recipes
				});
			} else {
				this.fetchData();
			}
		})
	}

	storeData() {
		const userId = firebase.auth().currentUser.uid;
		if (this.authService.isAuthenticated()) {
			const body = JSON.stringify(this.recipes);
			const headers = new Headers({
				'Content-Type': 'application/json'
			});
			return this.http.put(`https://recipebook-411ee.firebaseio.com/${userId}/recipes.json`, body, {headers: headers});
		}
	}

	fetchData() {
		const userId = firebase.auth().currentUser.uid;
		if (this.authService.isAuthenticated()) {
			return this.http.get(`https://recipebook-411ee.firebaseio.com/${userId}/recipes.json`)
				.map((response: Response) => response.json())
				.subscribe((data: Recipe[]) => {
					this.recipes = data;
					this.recipesChanged.emit(this.recipes);
				});
		}
	}
}
