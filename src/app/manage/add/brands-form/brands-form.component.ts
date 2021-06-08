import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { BrandsDetail } from '../../view/brands/brands.model';

@Component({
  selector: 'app-brands-form',
  templateUrl: './brands-form.component.html',
  styleUrls: ['./brands-form.component.css'],
})
export class BrandsFormComponent {
  constructor(private route: Router, private add: AddDataService) {}

  saveBrand(post: BrandsDetail) {
    this.add
      .addData('brands', post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );

    this.route.navigate(['/manage/brands']);
  }

  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
