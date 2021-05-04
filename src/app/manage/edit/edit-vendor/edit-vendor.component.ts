import { Component, OnInit } from '@angular/core';
import { VendorDetails } from '../../view/vendors/vendors.model';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataApiService } from '../../../get-data-api.service';

@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.css']
})
export class EditVendorComponent implements OnInit {

  vend: any
  vendor: any;
  vendors: any;
  
  constructor(private router: Router, private service: GetDataApiService, private route: ActivatedRoute) { 
    let id = this.route.snapshot.paramMap.get('Id');
    if (id) this.service.getVendor(id).subscribe(response => this.vendor = response);
  }

  ngOnInit(): void {

    this.service.getAllVendors()
    .subscribe(response => {
      this.vendors = response;

    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });
  }

updateVendor(post: VendorDetails){
 
  ;

  this.service.updateVendor(post)
  .pipe().subscribe(response => {
   
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });
  this.router.navigate(['vendors'])
}

}

