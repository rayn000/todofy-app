import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-acount-deletion-dialog',
  templateUrl: './acount-deletion-dialog.component.html',
  styleUrl: './acount-deletion-dialog.component.css'
})
export class AcountDeletionDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AcountDeletionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
