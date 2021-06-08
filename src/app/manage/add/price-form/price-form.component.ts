import { Component, OnInit } from '@angular/core';
import { PriceListDetails } from '../../view/price-list/price-list.model';
import { GetDataApiService } from '../../../get-data-api.service';
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
    private add: AddDataService
  ) {}

  ngOnInit(): void {
    this.all.getAllData('products').subscribe(
      (response) => {
        this.Products = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.all.getAllData('vendors').subscribe(
      (response) => {
        this.Vendors = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.all.getAllData('countries').subscribe(
      (response) => {
        this.Countries = response;
      },
      (error) => {
        alert('An unexpected error occured.');
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
          alert('An unexpected error occured.');
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
