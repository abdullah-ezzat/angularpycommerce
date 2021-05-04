import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent  {

  ImageUrl = [1, 2, 3].map((n) => `assets/images/${n}.jpg`);
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  public dialogRef: MatDialogRef<ImageDialogComponent>) {
  }

  onNoClick(){
    this.dialogRef.close();
  }


}
