import { Component, OnInit } from '@angular/core';
import { PriceListDetails } from '../../view/price-list/price-list.model';
import { Router, ActivatedRoute } from '@angular/router';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { AddDataService } from 'src/app/api/add/add-data.service';

@Component({
  selector: 'app-edit-price',
  templateUrl: './edit-price.component.html',
  styleUrls: ['./edit-price.component.css'],
})
export class EditPriceComponent implements OnInit {
  price: any;
  Products: any;
  Vendors: any;
  Countries: any;

  constructor(
    private route: ActivatedRoute,
    private all: GetAllService,
    private get: GetDataService,
    private update: AddDataService
  ) {
    let id = this.route.snapshot.paramMap.get('Id');
    if (id)
      this.get
        .getData('vendorPriceLists', id)
        .subscribe((response) => (this.price = response));
  }

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
    this.price = PriceListDetails;
  }

  updatePrice(post: PriceListDetails) {
    post.id = this.price.id;
    this.update
      .updateData('vendorPriceLists', post.id, post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );
    location.assign('/manage/prices');
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
