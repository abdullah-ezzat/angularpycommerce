import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsDetail } from '../../view/products/Products.model';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataApiService } from '../../../get-data-api.service';
import { SpecificationFormComponent } from '../../add/specification-form/specification-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { AddDataService } from 'src/app/api/add/add-data.service';

declare var $: any;
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  Categories: any;
  ProductId: any;
  Products: any;
  Brands: any;
  specification: any;
  product: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = [
    'id',
    'ProductId',
    'SpecificationName',
    'SpecificationValue',
    'edit',
  ];
  dataSource;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private services: GetDataApiService,
    private all: GetAllService,
    private get: GetDataService,
    private update: AddDataService
  ) {
    let id = this.route.snapshot.paramMap.get('Id');
    this.ProductId = id;
    if (id)
      this.get.getData('products', id).subscribe((response) => {
        this.product = response;
      });
  }

  ngOnInit(): void {
    this.all.getSubCategories().subscribe(
      (response) => {
        this.Categories = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.all.getAllData('brands').subscribe(
      (response) => {
        this.Brands = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.product = ProductsDetail;

    function readURL(input) {
      if (input.value && input.value[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $('#imgsrc').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.value[0]);
      }
    }

    $('#Image').change(function () {
      readURL(this);
    });
  }

  addProductSpecification(productId, CategoryId) {
    localStorage.setItem('CategoryId', CategoryId);
    localStorage.setItem('SpecificationProductId', productId);
    this.router.navigate(['/manage/specifications']);
  }

  copyFromProductSpecification(fromProductId, productId, CategoryId) {
    this.services
      .copyFromProductSepcification(fromProductId, productId, CategoryId)
      .subscribe(
        () => {
          this.router.navigate(['/manage/edit/product/' + productId]);
        },
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateProduct(post: ProductsDetail) {
    post.id = this.product.id;

    if (post.Image) {
      post.Image = post.Image._fileNames;
    }

    if (post.Image2) {
      post.Image2 = post.Image2._fileNames;
    }

    if (post.Image3) {
      post.Image3 = post.Image3._fileNames;
    }

    if (post.Image4) {
      post.Image4 = post.Image4._fileNames;
    }

    this.update
      .updateData('products', post.id, post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );
    this.router.navigate(['/manage/products']);
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
