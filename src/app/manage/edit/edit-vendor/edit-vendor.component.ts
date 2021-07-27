import { Component, OnInit } from '@angular/core';
import { VendorDetails } from '../../view/vendors/vendors.model';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.css'],
})
export class EditVendorComponent implements OnInit {
  vendor: any;
  constructor(
    private route: ActivatedRoute,
    private get: GetDataService,
    private update: AddDataService,
    private toastr: ToastrService
  ) {
    let id = this.route.snapshot.paramMap.get('Id');
    if (id)
      this.get.getData('vendors', id).subscribe(async (response) => {
        await this.get
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.vendor = data;
          });
      });
  }
  ngOnInit() {
    this.vendor = VendorDetails;
  }
  updateVendor(post: VendorDetails) {
    post.id = this.vendor.id;
    this.update
      .updateData('vendors', post.id, post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          this.toastr.error('Error while retrieving data');
          console.log(error);
        }
      );
    location.assign('/manage/vendors');
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
