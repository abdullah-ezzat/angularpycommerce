import { Component, OnInit } from '@angular/core';
import { PriceListDetails } from '../../view/price-list/price-list.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { AddDataService } from 'src/app/api/add/add-data.service';

@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.css'],
})
export class PriceFormComponent implements OnInit {
  Prices: any;
  Products: any;
  Vendors: any;
  Countries: any;

  constructor(
    private route: Router,
    private all: GetAllService,
    private add: AddDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
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

    this.all.getAllData('vendors').subscribe(
      async (response) => {
        await this.all
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.Vendors = data;
          });
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );

    this.all.getAllData('countries').subscribe(
      async (response) => {
        await this.all
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.Countries = data;
          });
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );
  }

  savePrice(post: PriceListDetails) {
    this.add
      .addData('vendorPriceLists', post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          this.toastr.error('Error while retrieving data');
          console.log(error);
        }
      );

    this.route.navigate(['/manage/prices']);
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
