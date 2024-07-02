import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/user';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { TokenService } from '../service/token.service';
import { RouterService } from '../service/router.service';
import { MatDialog } from '@angular/material/dialog';
import { AcountDeletionDialogComponent } from '../acount-deletion-dialog/acount-deletion-dialog.component';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'], // Fixed the typo here
})
export class UpdateProfileComponent implements OnInit {
  fetchedUser: User = {};
  updateUserForm: FormGroup;
  canDeactivate: boolean = false;


  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private tokenService: TokenService,
    private router: RouterService,
    private dialog: MatDialog,
  ) {
    this.updateUserForm = this.fb.group({
      userId: [''],
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
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/
          ),
        ],
      ],
      email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2,}$/)]],
      lastName: [''],
      dateUserRegistered: ['']
    }, { validators: this.checkPasswordMismatch });
  }

  canDeactivateComponent() {
    console.log('canDeactivate outside if statement');
    if (this.updateUserForm.dirty && !this.canDeactivate) {
      console.log('canDeactivate inside if statement');
      
      return confirm('You have unsaved changes. Are you sure you want to leave?');
    }
    return true;
  }

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser() {
    this.userService.fetchUser().subscribe((data) => {
      this.fetchedUser = data;
      console.log(data);

      // Used patchValue to update the form with fetched user data
      this.updateUserForm.patchValue({
        userId: this.fetchedUser.userId,
        password: this.fetchedUser.password,
        confirmPassword: this.fetchedUser.password,
        email: this.fetchedUser.email,
        firstName: this.fetchedUser.firstName,
        lastName: this.fetchedUser.lastName,
        dateUserRegistered: this.fetchedUser.dateUserRegistered
      });
    });
  }

  deleteUser() {
    const dialogRef = this.dialog.open(AcountDeletionDialogComponent, {
      width: '340px',
      data: { message: "Are you sure you want to delete your account? This action can't be undone." }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser().subscribe({
          next: (response) => {
            console.log('User deleted:', response);
            this._snackBar.open('Account deleted successfully', 'Close', {
              duration: 2000,
            });

            this.tokenService.removeToken();
            this.router.navigateToHome();
          },
          error: (err) => {
            console.error('Error unable to delete account:', err);
            this._snackBar.open('Failed to delete account', 'Close', {
              duration: 2000,
            });
          },
        });
      }
    });
  }

  updateUser() {
    const updatedUser: User = this.updateUserForm.value as User;

    this.userService.updateUser(updatedUser).subscribe({
      next: (response) => {
        console.log('User updated:', response);
        this._snackBar.open('User updated successfully', 'Close', {
          duration: 2000,
        });

        this.canDeactivate = true;
      },
      error: (err) => {
        console.error('Error unable to update user:', err);
        this._snackBar.open('Failed to update the user', 'Close', {
          duration: 2000,
        });
      },
    });
  }

  cancelUpdate() {
    this.router.navigateToTodoList();
  }

  get password() {
    return this.updateUserForm.get('password');
  }

  get confirmPassword() {
    return this.updateUserForm.get('confirmPassword');
  }

  get email() {
    return this.updateUserForm.get('email');
  }

  get firstName() {
    return this.updateUserForm.get('firstName');
  }

  get lastName() {
    return this.updateUserForm.get('lastName');
  }

  checkPasswordMismatch(c: AbstractControl) {
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
