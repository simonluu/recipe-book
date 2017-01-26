import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SignupComponent } from './login/signup.component';
import { SigninComponent } from './login/signin.component';

import { AuthGuard } from './shared/auth.guard';

import { RECIPE_ROUTES } from './recipes/recipes.routes';

const APP_ROUTES: Routes = [
	{ path: '', redirectTo: '/', pathMatch: 'full' },
	{ path: '', component: HomeComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'signin', component: SigninComponent },
	{ path: 'recipes', component: RecipesComponent, children: RECIPE_ROUTES, canActivate: [AuthGuard] },
	{ path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forRoot(APP_ROUTES);