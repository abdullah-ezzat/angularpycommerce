import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { GetDataApiService } from '../../../get-data-api.service';
import { StoresDetail } from '../../view/stores/Stores.model';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.css'],
})
export class EditStoreComponent implements OnInit {
  Vendors: any;
  ShippingAgents: any;
  Countries: any;
  store: any;

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
        .getData('stores', id)
        .subscribe((response) => (this.store = response));
  }

  ngOnInit(): void {
    this.all.getAllData('shippingAgents').subscribe(
      (response) => {
        this.ShippingAgents = response;
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

  updateStore(post: StoresDetail) {
    this.update
      .updateData('stores', post.id, post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );

    this.router.navigate(['/manage/stores']);
  }
}
