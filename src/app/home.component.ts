import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { AuthService } from './shared/auth.service';

@Component({
  selector: 'rb-home',
  template: `
    <h1>Welcome to the Recipe Book Web Application!</h1>
    <h1 *ngIf="!isAuth()">Please login or create an account</h1>
  `,
  styles: []
})
export class HomeComponent implements OnInit, OnDestroy {
  homeAuthenticated = false;
  private subscription: Subscription;

  constructor(private authService: AuthService) {
    this.subscription = this.authService.isAuthenticated().subscribe(
      authStatus => this.homeAuthenticated = authStatus
    );
  }

  ngOnInit() {
  }

  isAuth() {
    return this.homeAuthenticated;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
