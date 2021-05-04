import { Component, OnInit } from '@angular/core';
import { GetDataApiService } from '../../../get-data-api.service';
import { Router } from '@angular/router';
import { ProductsDetail } from '../../view/products/Products.model';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {

    product: any;
    category: any;
    Categories: any;
    brand: any;
    Brands: any;

  constructor(private route: Router, private service: GetDataApiService) { }
  
  ngOnInit(): void {
    this.service.getSubCategory()
    .subscribe(response => {
      this.Categories = response;

    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });

    this.service.getAllBrands()
    .subscribe(response => {
      this.Brands = response;

    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });
  }

  saveProduct(post : ProductsDetail){

    ;
    this.service.addNewProduct(post)
    .pipe().subscribe(response => {
        
    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });
    this.route.navigate(['/products'])
  }
}
