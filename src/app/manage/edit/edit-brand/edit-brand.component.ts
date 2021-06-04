import { Component, OnInit } from '@angular/core';
import { BrandsDetail } from '../../view/brands/brands.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetDataService } from 'src/app/api/get/get-data.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css'],
})
export class EditBrandComponent implements OnInit {
  brand: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private get: GetDataService,
    private update: AddDataService
  ) {
    let id = this.route.snapshot.paramMap.get('Id');
    if (id)
      this.get
        .getData('brands', id)
        .subscribe((response) => (this.brand = response));
  }

  ngOnInit() {
    this.brand = BrandsDetail;
  }

  updateBrand(post: BrandsDetail) {
    post.id = this.brand.id;
    this.update
      .updateData('brands', post.id, post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );
    this.router.navigate(['/manage/brands']);
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
