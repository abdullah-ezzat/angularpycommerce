import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  img: '';
  img2: '';
  img3: '';
  img4: '';
}
@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css'],
})
export class ProductImageComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
