import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InventoryDetails } from '../../view/inventory-detail/inventory-detail.model';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetDataService } from 'src/app/api/get/get-data.service';

@Component({
  selector: 'app-inventory-detail-form',
  templateUrl: './inventory-detail-form.component.html',
  styleUrls: ['./inventory-detail-form.component.css'],
})
export class InventoryDetailFormComponent implements OnInit {
  Stores: any;
  filteredStores: any;
  Products: any;
  filteredProducts: any;

  constructor(
    private toastr: ToastrService,
    private all: GetAllService,
    private get: GetDataService,
    private add: AddDataService
  ) {}

  ngOnInit(): void {
    this.all.getAllData('products').subscribe(
      async (response) => {
        await this.all
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

    this.all.getAllData('stores').subscribe(
      async (response) => {
        await this.all
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.Stores = data;
            this.filteredStores = this.Stores.slice();
          });
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );
  }

  saveDetail(post: InventoryDetails) {
    this.get
      .checkProductExist(post.StoreId_id, post.ProductId_id)
      .pipe()
      .subscribe((response) => {
        if (response == true) {
          this.add
            .addInventory(post)
            .pipe()
            .subscribe(
              (response) => {
                if (response == false) {
                  this.toastr.error(
                    'because the quantity issued is greater than the available balance',
                    "Can't save this transation"
                  );
                } else {
                  location.assign('/manage/inventories');
                }
              },
              (error) => {
                this.toastr.error('Error while retrieving data');
                console.log(error);
              }
            );
        } else {
          this.toastr
            .error(
              "This product doesn't exist in price list",
              'Click here to add it'
            )
            .onTap.subscribe(() => location.assign('/manage/prices'));
        }
      });
  }
}
