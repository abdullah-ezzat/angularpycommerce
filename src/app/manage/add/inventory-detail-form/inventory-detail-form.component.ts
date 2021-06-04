import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryDetails } from '../../view/inventory-detail/inventory-detail.model';
import { ToastrService } from 'ngx-toastr';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetDataApiService } from 'src/app/get-data-api.service';

@Component({
  selector: 'app-inventory-detail-form',
  templateUrl: './inventory-detail-form.component.html',
  styleUrls: ['./inventory-detail-form.component.css'],
})
export class InventoryDetailFormComponent implements OnInit {
  Details: any;
  Stores: any;
  Products: any;
  checkExist: any;

  constructor(
    private route: Router,
    private toastr: ToastrService,
    private services: GetDataApiService,
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

    this.all.getAllData('stores').subscribe(
      (response) => {
        this.Stores = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
  }

  saveDetail(post: InventoryDetails) {
    this.services
      .checkPriceListExist(post.StoreId, post.ProductId)
      .pipe()
      .subscribe((response) => {
        if (response == true) {
          this.add
            .addData('inventoryDetails', post)
            .pipe()
            .subscribe(
              () => {},
              (error) => {
                alert('An unexpected error occured.');
                console.log(error);
              }
            );
          this.route.navigate(['/manage/inventories']);
        } else {
          this.toastr
            .error(
              "This product doesn't exist in price list. Click here to add it."
            )
            .onTap.subscribe(() => this.route.navigate(['/manage/prices']));
        }
      });
  }
}
