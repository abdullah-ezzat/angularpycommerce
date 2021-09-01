import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { ProductSpecificationDetails } from './product-specification.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-specification',
  templateUrl: './product-specification.component.html',
  styleUrls: ['./product-specification.component.css'],
})
export class ProductSpecificationComponent implements OnInit {
  Products: any;
  Specifications: any;
  ProductId: any;
  CategoryId: any;
  Categories: any;

  constructor(
    private route: Router,
    private add: AddDataService,
    private all: GetAllService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let CategoryId = localStorage.getItem('CategoryId');
    this.CategoryId = CategoryId;
    localStorage.removeItem('CategoryId');

    let SpecificationProductId = localStorage.getItem('SpecificationProductId');
    this.ProductId = SpecificationProductId;
    localStorage.removeItem('SpecificationProductId');

    this.all.getAllData('specifications').subscribe(
      async (response) => {
        await this.all
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.Specifications = data;
          });
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );

    this.all.getAllData('products').subscribe(
      async (response) => {
        await this.all
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.Products = data;
          });
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );

    this.all.getAllData('categories').subscribe(
      async (response) => {
        await this.all
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.Categories = data;
          });
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );
  }

  addSpecification(post: ProductSpecificationDetails) {
    post.ProductId = this.ProductId;
    post.CategoryId = this.CategoryId;
    this.add
      .addData('productSpecifications', post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          this.toastr.error('Error while retrieving data');
          console.log(error);
        }
      );
    this.route.navigate(['/manage/edit/product/' + this.ProductId]);
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
