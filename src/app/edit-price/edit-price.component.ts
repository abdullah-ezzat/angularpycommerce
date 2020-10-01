import { Component, OnInit } from '@angular/core';
import { PriceListDetails } from '../price-list/price-list.model';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataApiService } from '../get-data-api.service';

@Component({
  selector: 'app-edit-price',
  templateUrl: './edit-price.component.html',
  styleUrls: ['./edit-price.component.css']
})
export class EditPriceComponent implements OnInit {

  price: any;
  Prices: any;

  product: any;
  Products: any;

  vendor: any;
  Vendors: any;

  country: any;
  Countries: any;

  constructor(private router: Router, private service: GetDataApiService, private route: ActivatedRoute) { 
    let id = this.route.snapshot.paramMap.get('Id');
    if (id) this.service.getPrice(id).subscribe(response => this.price = response);
  }

  ngOnInit(): void {

    this.service.GetAllProducts()
    .subscribe(response => {
      this.Products = response;
      
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

  updatePrice(post: PriceListDetails){
 
  console.log(post);

  this.service.updatePrice(post)
  .pipe().subscribe(response => {
   
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });
  this.router.navigate(['/PriceList'])
}

}

