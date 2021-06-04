import { Component } from '@angular/core';
import { VendorDetails } from '../../view/vendors/vendors.model';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { AddDataService } from 'src/app/api/add/add-data.service';

@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.css'],
})
export class EditVendorComponent {
  vendor: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private get: GetDataService,
    private update: AddDataService
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.get
        .getData('vendors', id)
        .subscribe((response) => (this.vendor = response));
  }

  updateVendor(post: VendorDetails) {
    this.update
      .updateData('vendors', post.id, post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );
    this.router.navigate(['/manage/vendors']);
  }
}
