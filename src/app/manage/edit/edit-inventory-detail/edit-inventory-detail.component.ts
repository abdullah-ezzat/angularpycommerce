import { Component, OnInit } from '@angular/core';
import { InventoryDetails } from '../../view/inventory-detail/inventory-detail.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';

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
    private router: Router,
    private route: ActivatedRoute,
    private all: GetAllService,
    private get: GetDataService,
    private update: AddDataService
  ) {
    let id = this.route.snapshot.paramMap.get('id');
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
    this.router.navigate(['/manage/inventories']);
  }
}
