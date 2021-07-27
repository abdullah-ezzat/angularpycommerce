import { Component, OnInit } from '@angular/core';
import { PriceListDetails } from '../../view/price-list/price-list.model';
import { ActivatedRoute } from '@angular/router';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { ToastrService } from 'ngx-toastr';
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
    private update: AddDataService,
    private toastr: ToastrService
  ) {
    let id = this.route.snapshot.paramMap.get('Id');
    if (id)
      this.get.getData('vendorPriceLists', id).subscribe(async (response) => {
        await this.get
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.price = data;
          });
      });
  }

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
          this.toastr.error('Error while retrieving data');
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
