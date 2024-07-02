import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignIn } from '../models/sign-in';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignInService } from '../service/sign-in.service';
import { RouterService } from '../service/router.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private signInService: SignInService,
    private _snackBar: MatSnackBar,
    private router: RouterService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {}

  
  token: string = "";

  onSignIn() {
    let signInUser: SignIn = this.signInForm.value as SignIn;

    this.signInService.login(signInUser).subscribe({
      next: (data) => {
        this._snackBar.open('Sign in successful !!', 'success', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary'],
        });
        this.token = data.token;
        console.log(data.token);
        this.tokenService.setToken(this.token);

        this.router.navigateToSideNav();
      },
      error: (error) => {
        this._snackBar.open(
          'Check your Username & Password or Please try again later',
          'close',
          { duration: 5000, panelClass: ['mat-toolbar', 'mat-warn'] }
        );
      },
    });

    // this.signInForm.reset();
  }

  signInForm = this.fb.group({
    userId: [
      '',
      [Validators.required],
    ],
    password: ['', [Validators.required]],
  });

  get userId() {
    return this.signInForm.get('userId');
  }
  get password() {
    return this.signInForm.get('password');
  }
}
