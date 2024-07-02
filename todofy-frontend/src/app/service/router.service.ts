import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router) { }

  navigateToSignUp() {
    this.router.navigateByUrl('/sign-up');
  }

  navigateToSignIn() {
    this.router.navigateByUrl('sign-in');
  }
  
  navigateToSideNav() {
    this.router.navigateByUrl('app');
  }

  navigateToTodoList() {
    this.router.navigateByUrl('app/all-tasks');
  }

  navigateToHome() {
    this.router.navigateByUrl('/home');
  }
  
}
