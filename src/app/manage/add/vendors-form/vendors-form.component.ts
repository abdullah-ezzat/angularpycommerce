import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { VendorDetails } from '../../view/vendors/vendors.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-vendors-form',
  templateUrl: './vendors-form.component.html',
  styleUrls: ['./vendors-form.component.css'],
})
export class VendorsFormComponent implements OnInit {
  Vendors: any;
  vendor: any;
  vend: any;

  constructor(
    private route: Router,
    private all: GetAllService,
    private add: AddDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.all.getAllData('vendors').subscribe(
      async (response) => {
        await this.all
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.Vendors = data;
          });
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );
  }

  saveVendor(post: VendorDetails) {
    this.add
      .addData('vendors', post)
      .pipe()
      .subscribe((error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      });
    this.route.navigate(['/manage/vendors']);
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
