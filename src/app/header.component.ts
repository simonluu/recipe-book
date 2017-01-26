import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { RecipeService } from './recipes/recipe.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy {
	headerAuthenticated = false;
	private subscription: Subscription;

	constructor(private recipeService: RecipeService, private authService: AuthService) {
		this.subscription = this.authService.isAuthenticated().subscribe(
			authStatus => this.headerAuthenticated = authStatus
		);
	}

	onStore() {
		this.recipeService.storeData().subscribe(
			error => console.log(error)
		);
	}

	onFetch() {
		this.recipeService.fetchData();
	}

	isAuth() {
		return this.headerAuthenticated;
	}

	onLogout() {
		this.authService.logout();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
