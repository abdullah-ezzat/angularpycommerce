import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetDataApiService } from 'src/app/get-data-api.service';
import { ProductSpecificationDetails } from '../../../views/product-specification/product-specification.model';

@Component({
  selector: 'app-specification-form',
  templateUrl: './specification-form.component.html',
  styleUrls: ['./specification-form.component.css'],
})
export class SpecificationFormComponent implements OnInit {
  Products: any;
  Specification: any;
  Specifications: any;
  ProductId: any;
  CategoryId: any;

  constructor(
    private route: Router,
    private service: GetDataApiService,
    private add: AddDataService
  ) {}

  ngOnInit(): void {
    let CategoryId = localStorage.getItem('CategoryId');
    this.CategoryId = CategoryId;
    localStorage.removeItem('CategoryId');

    let SpecificationProductId = localStorage.getItem('SpecificationProductId');
    this.ProductId = SpecificationProductId;
    localStorage.removeItem('SpecificationProductId');

    this.service.getAllSpecifications(this.CategoryId).subscribe(
      (response) => {
        this.Specifications = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
  }

  addSpecification(post: ProductSpecificationDetails) {
    this.add
      .addData('productSpecifications', post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );
    this.route.navigate(['/edit/product/' + this.ProductId]);
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
