import { Component, OnInit } from '@angular/core';
import { InventoryDetails } from '../../view/inventory-detail/inventory-detail.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-inventory-detail',
  templateUrl: './edit-inventory-detail.component.html',
  styleUrls: ['./edit-inventory-detail.component.css'],
})
export class EditInventoryDetailComponent implements OnInit {
  store: any;
  Stores: any;

  product: any;
  Products: any;

  detail: any;
  Details: any;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private all: GetAllService,
    private get: GetDataService,
    private update: AddDataService
  ) {
    let id = this.route.snapshot.paramMap.get('Id');
    if (id)
      this.get
        .getData('inventoryDetails', id)
        .subscribe((response) => (this.detail = response));
  }

  ngOnInit(): void {
    this.all.getAllData('stores').subscribe(
      (response) => {
        this.Stores = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.all.getAllData('products').subscribe(
      (response) => {
        this.Products = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
  }

  updateDetail(post: InventoryDetails) {
    post.id = this.detail.id;
    this.get
      .checkProductExist(post.StoreId_id, post.ProductId_id)
      .pipe()
      .subscribe((response) => {
        if (response == true) {
          this.update
            .updateData('inventoryDetails', post.id, post)
            .pipe()
            .subscribe(
              () => {},
              (error) => {
                alert('An unexpected error occured.');
                console.log(error);
              }
            );
          location.assign('/manage/inventories');
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
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
