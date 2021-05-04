import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataApiService } from '../../../get-data-api.service';
import { ProductSpecificationDetails } from '../../../views/product-specification/product-specification.model';

@Component({
  selector: 'app-specification-form',
  templateUrl: './specification-form.component.html',
  styleUrls: ['./specification-form.component.css']
})
export class SpecificationFormComponent implements OnInit {

  product: any;
  Products: any;

  Specification: any;
  Specifications: any;

  AllSpecifications: any;
  ProductId: any;
  CategoryId: any;

constructor(private route: Router, private service: GetDataApiService) { }

ngOnInit(): void {

  let CategoryId = localStorage.getItem('CategoryId');
  this.CategoryId = CategoryId;
  localStorage.removeItem('CategoryId');

  let SpecificationProductId = localStorage.getItem('SpecificationProductId')
    this.ProductId = SpecificationProductId;
  localStorage.removeItem('SpecificationProductId');

  this.service.getAllSpecifications(this.CategoryId)
  .subscribe(response => {
    this.AllSpecifications = response;

  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });

}


addSpecification(post : ProductSpecificationDetails){

  ;
  this.service.addProductSpecification(post)
  .pipe().subscribe(response => {
      ;
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });
  this.route.navigate(['/editProduct/' + this.ProductId])
}

  
}
