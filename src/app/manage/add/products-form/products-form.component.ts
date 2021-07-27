import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProductsDetail } from '../../view/products/Products.model';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { AddDataService } from 'src/app/api/add/add-data.service';

declare var $: any;
@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css'],
})
export class ProductsFormComponent implements OnInit {
  Categories: any;
  Brands: any;

  constructor(
    private route: Router,
    private all: GetAllService,
    private add: AddDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.all.getSubCategories().subscribe(
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

    this.all.getAllData('brands').subscribe(
      async (response) => {
        await this.all
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

  saveProduct(post: ProductsDetail) {
    this.add
      .addData('products', post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          this.toastr.error('Error while retrieving data');
          console.log(error);
        }
      );
    this.route.navigate(['/manage/products']);
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
