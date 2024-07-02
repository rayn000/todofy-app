import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SignUpService } from '../service/sign-up.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignUp } from '../models/sign-up';
import { RouterService } from '../service/router.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private signUpService: SignUpService,
    private _snackBar: MatSnackBar,
    private router: RouterService,
  ) {}

  ngOnInit(): void {}

  onSignUp() {
    let userSignUp: SignUp = this.signUpForm.value as SignUp;
    
    this.signUpForm.value.dateUserRegistered = new Date().toISOString();    
    
    this.signUpService.registerUser(userSignUp).subscribe({
      next: (data) => {
        this._snackBar.open('🎉 Congrats !! Sign Up successful !', 'success', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary'],
        });

        this.router.navigateToSignIn();
      },
      error: (error) => {
        console.log('In sign-up error::::::',error.message);
        
        this._snackBar.open(
          'Failed to sign up !! Please Try Again Later',
          'close',
          { duration: 3000, panelClass: ['mat-toolbar', 'mat-warn'] }
        );
      },
    });

    // this.signUpForm.reset();
  }

  signUpForm = this.fb.group(
    {
      firstName: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z]{2,}$/)],
      ],
      lastName: [''],
      userId: [
        '',
        [Validators.required, Validators.pattern(/^[a-z._][a-z0-9._]*$/)],
      ],
      email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/
          ),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/
          ),
        ],
      ],
      dateUserRegistered: [''],
    },
    { validators: this.checkPasswordMisMatch }
  );

  get firstName() {
    return this.signUpForm.get('firstName');
  }
  get lastName() {
    return this.signUpForm.get('lastName');
  }
  get userId() {
    return this.signUpForm.get('userId');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }
  get dateUserRegistered() {
    return this.signUpForm.get('dateUserRegistered');
  }

  checkPasswordMisMatch(c: AbstractControl) {
    const password = c.get('password');
    const confirmPassword = c.get('confirmPassword');

    if (!password?.value || !confirmPassword?.value) {
      return null;
    }

    return password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }
}
