import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs/Rx';

import { User } from './user.interface';

declare var firebase: any;

@Injectable()
export class AuthService {
	constructor(private router: Router) {}

	signupUser(user: User) {
		firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
		  console.log(error);
		});

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.router.navigate(['/recipes']);
			}
		});
	}

	signinUser(user: User) {
		firebase.auth().signInWithEmailAndPassword(user.email, user.password).catch(function(error) {
		  console.log(error);
		});

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.router.navigate(['/recipes']);
			}
		});
	}

	logout() {
		firebase.auth().signOut();
		this.router.navigate(['/']);
	}

	isAuthenticated(): Observable<boolean> {
		const subject = new Subject<boolean>();
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				subject.next(true);
			} else {
				subject.next(false);
			}
		});
		return subject.asObservable();
	}
}