import { Component, OnInit } from '@angular/core';
import { PriceListDetails } from '../price-list/price-list.model';
import { GetDataApiService } from '../get-data-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.css']
})
export class PriceFormComponent implements OnInit {

  price: any;
  Prices: any;

  product: any;
  Products: any;

  vendor: any;
  Vendors: any;

  country: any;
  Countries: any;

constructor(private route: Router, private service: GetDataApiService) { }

ngOnInit(): void {

  this.service.GetAllProducts()
  .subscribe(response => {
    this.Products  = response;
    
     console.log( this.Products);
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });

  this.service.getAllVendors()
  .subscribe(response => {
    this.Vendors = response;
    
     console.log( this.Vendors);
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });

  this.service.getAllCountries()
  .subscribe(response => {
    this.Countries = response;
    
     console.log( this.Countries);
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });
}

savePrice(post : PriceListDetails){

  console.log(post);
  this.service.addNewPriceList(post)
  .pipe().subscribe(response => {
      
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });

  this.route.navigate(['PriceList'])
}
}
