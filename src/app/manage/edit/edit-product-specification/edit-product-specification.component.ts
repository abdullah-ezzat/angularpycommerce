import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { ProductSpecificationDetails } from '../../add/product-specification/product-specification.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-product-specification',
  templateUrl: './edit-product-specification.component.html',
  styleUrls: ['./edit-product-specification.component.css'],
})
export class EditProductSpecificationComponent implements OnInit {
  Specifications: any;
  filteredSpecifications: any;
  specification: any;
  Products: any;
  ProductId: any;
  CategoryId: any;
  Categories: any;

  constructor(
    private route: ActivatedRoute,
    private all: GetAllService,
    private get: GetDataService,
    private update: AddDataService,
    private toastr: ToastrService
  ) {
    let id = this.route.snapshot.paramMap.get('Id');
    this.ProductId = id;
    if (id)
      this.get
        .getData('productSpecifications', id)
        .subscribe(async (response) => {
          await this.get
            .decryptData(response['token'], response['key'])
            .then((data) => {
              this.specification = data;
            });
        });
  }

  ngOnInit(): void {
    let CategoryId = localStorage.getItem('CategoryId');
    this.CategoryId = CategoryId;
    localStorage.removeItem('CategoryId');

    this.all.getAllSpecifications(this.CategoryId).subscribe(
      async (response) => {
        await this.all
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.Specifications = data;
            this.filteredSpecifications = this.Specifications.slice();
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
    this.specification = ProductSpecificationDetails;
  }

  updateProductSpecification(post: ProductSpecificationDetails) {
    post.id = this.specification.id;
    post.ProductId = this.ProductId;
    post.CategoryId = this.CategoryId;
    this.update
      .updateData('productSpecifications', post.id, post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          this.toastr.error('Error while retrieving data');
          console.log(error);
        }
      );
    location.assign('/manage/edit/product/' + this.specification.ProductId);
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
