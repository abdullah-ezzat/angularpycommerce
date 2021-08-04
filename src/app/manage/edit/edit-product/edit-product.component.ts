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
  filteredCategories: any;
  Products: any;
  filteredProducts: any;
  Brands: any;
  filteredBrands: any;
  ProductId: any;
  specifications: any;
  product: any;
  image: File;
  image2: File;
  image3: File;
  image4: File;

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
            this.filteredCategories = this.Categories.slice();
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
            this.filteredProducts = this.Products.slice();
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
            this.filteredBrands = this.Brands.slice();
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
    location.assign('/manage/add/product/specification/');
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
  onChangeImg1(event: any) {
    this.image = event.target.files[0];
  }
  onChangeImg2(event: any) {
    this.image2 = event.target.files[0];
  }
  onChangeImg3(event: any) {
    this.image3 = event.target.files[0];
  }
  onChangeImg4(event: any) {
    this.image4 = event.target.files[0];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editSpecification(ProductId, CategoryId) {
    localStorage.setItem('CategoryId', CategoryId);
    location.assign('/manage/edit/product/specification/' + ProductId);
  }
  updateProduct(post: ProductsDetail) {
    post.id = this.product.id;
    const formData = new FormData();
    formData.append('NameL', post.NameL.toString());
    formData.append('BrandId', post.BrandId_id.toString());
    formData.append('CategoryId', post.CategoryId_id.toString());
    formData.append('Description', post.Description.toString());
    if (this.image != null) {
      formData.append('Image', this.image, this.image.name);
    }
    if (this.image2 != null) {
      formData.append('Image2', this.image2, this.image2.name);
    }
    if (this.image3 != null) {
      formData.append('Image3', this.image3, this.image3.name);
    }
    if (this.image4 != null) {
      formData.append('Image4', this.image4, this.image4.name);
    }
    this.update
      .updateProduct(post.id, formData)
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
