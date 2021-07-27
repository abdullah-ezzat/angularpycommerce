import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsDetail } from '../../view/products/Products.model';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { ToastrService } from 'ngx-toastr';

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
  specifications: any;
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
    private route: ActivatedRoute,
    private add: AddDataService,
    private all: GetAllService,
    private get: GetDataService,
    private update: AddDataService,
    private toastr: ToastrService
  ) {
    let id = this.route.snapshot.paramMap.get('Id');
    this.ProductId = id;
    if (id)
      this.get.getData('products', id).subscribe(async (response) => {
        await this.get
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.product = data;
          });
      });
  }

  ngOnInit(): void {
    this.all.getSubCategories().subscribe(
      async (response) => {
        await this.get
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

    this.all.getAllData('products').subscribe(
      async (response) => {
        await this.get
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

    this.all.getAllData('brands').subscribe(
      async (response) => {
        await this.get
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.Brands = data;
          });
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );

    this.all.getProSpec(this.ProductId).subscribe(
      (response) => {
        this.specifications = response;
        this.dataSource = new MatTableDataSource(this.specifications);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );

    this.product = ProductsDetail;

    function readURL(input, img) {
      if (input.value && input.value[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $(img).attr('src', e.target.result);
        };
        reader.readAsDataURL(input.value[0]);
      }
    }

    $('#Image').change(function () {
      readURL(this, '#imgsrc');
    });
    $('#Image2').change(function () {
      readURL(this, '#imgsrc2');
    });
    $('#Image3').change(function () {
      readURL(this, '#imgsrc3');
    });
    $('#Image4').change(function () {
      readURL(this, '#imgsrc4');
    });
  }

  addProductSpecification(productId, CategoryId) {
    localStorage.setItem('CategoryId', CategoryId);
    localStorage.setItem('SpecificationProductId', productId);
    location.assign('/manage/add/specification/');
  }

  copyProductSpecification(fromProductId, productId, CategoryId) {
    this.add.copyProductSpec(fromProductId, productId, CategoryId).subscribe(
      () => {
        location.assign('/manage/edit/product/' + productId);
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
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

    if (post.Image != null) {
      post.Image = post.Image._fileNames;
    } else {
      post.Image = this.product.Image;
    }

    if (post.Image2 != null) {
      post.Image2 = post.Image2._fileNames;
    } else {
      post.Image2 = this.product.Image2;
    }

    if (post.Image3 != null) {
      post.Image3 = post.Image3._fileNames;
    } else {
      post.Image3 = this.product.Image3;
    }

    if (post.Image4 != null) {
      post.Image4 = post.Image4._fileNames;
    } else {
      post.Image4 = this.product.Image4;
    }

    this.update
      .updateData('products', post.id, post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          this.toastr.error('Error while retrieving data');
          console.log(error);
        }
      );
    location.assign('/manage/products');
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
