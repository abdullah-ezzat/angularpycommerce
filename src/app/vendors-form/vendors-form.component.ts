import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataApiService } from '../get-data-api.service';
import { VendorDetails } from '../vendors/vendors.model';

@Component({
  selector: 'app-vendors-form',
  templateUrl: './vendors-form.component.html',
  styleUrls: ['./vendors-form.component.css']
})
export class VendorsFormComponent implements OnInit {

  Vendors: any;
  vendor: any;
  vend: any;

  constructor(private route: Router, private service: GetDataApiService) { }
  
  ngOnInit(): void {
    this.service.getAllVendors()
    .subscribe(response => {
      this.Vendors = response;

    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });
  }

  saveVendor(post : VendorDetails){

    ;
    this.service.addNewVendor(post)
    .pipe().subscribe(response => {
        
    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });

    this.route.navigate(['vendors'])
  }
}
