import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataApiService } from '../get-data-api.service';
import { StoresDetail } from '../stores/Stores.model';

@Component({
  selector: 'app-stores-form',
  templateUrl: './stores-form.component.html',
  styleUrls: ['./stores-form.component.css']
})
export class StoresFormComponent implements OnInit {

  store: any;
  Stores: any;

  vendor: any;
  Vendors: any;

  Country: any;
  Countries: any

  shippingAgent: any;
  ShippingAgents: any;
  
constructor(private route: Router, private service: GetDataApiService) { }

ngOnInit(): void {
  this.service.getAllVendors()
  .subscribe(response => {
    this.Vendors = response;
    
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });

  this.service.getAllShippingAgents()
  .subscribe(response => {
    this.ShippingAgents = response;

  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });

  this.service.getAllCountries()
  .subscribe(response => {
    this.Countries = response;

  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });
}

saveStore(post : StoresDetail){

post.MapLocation =  post.MapLocation.replace("<iframe src=", "");
post.MapLocation =  post.MapLocation.replace("></iframe>", "");

  ;
  this.service.addNewStore(post)
  .pipe().subscribe(response => {
      
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });

  this.route.navigate(['Stores'])
}
}
