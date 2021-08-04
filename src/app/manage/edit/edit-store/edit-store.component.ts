import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';

import { StoresDetail } from '../../view/stores/Stores.model';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.css'],
})
export class EditStoreComponent implements OnInit {
  Vendors: any;
  filteredVendors: any;
  ShippingAgents: any;
  filteredShippingAgents: any;
  Countries: any;
  filteredCountries: any;
  store: any;

  constructor(
    private route: ActivatedRoute,
    private all: GetAllService,
    private get: GetDataService,
    private update: AddDataService,
    private toastr: ToastrService
  ) {
    let id = this.route.snapshot.paramMap.get('Id');
    if (id)
      this.get.getData('stores', id).subscribe(async (response) => {
        await this.get
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.store = data;
          });
      });
  }

  ngOnInit(): void {
    this.all.getAllData('shippingAgents').subscribe(
      async (response) => {
        await this.get
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.ShippingAgents = data;
            this.filteredShippingAgents = this.ShippingAgents.slice();
          });
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );

    this.all.getAllData('vendors').subscribe(
      async (response) => {
        await this.get
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.Vendors = data;
            this.filteredVendors = this.Vendors.slice();
          });
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );

    this.all.getAllData('countries').subscribe(
      async (response) => {
        await this.get
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.Countries = data;
            this.filteredCountries = this.Countries.slice();
          });
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );
    this.store = StoresDetail;
  }

  updateStore(post: StoresDetail) {
    var options = {
      enableHighAccuracy: true,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;
      post.Latitude = crd.latitude;
      post.Longitude = crd.longitude;
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.watchPosition(success, error, options);

    if ((post.Latitude || post.Longitude) == (null || '')) {
      this.toastr.error('You must allow location to get coordinates');
    } else {
      location.assign('/manage/stores');
      post.id = this.store.id;
      this.update
        .updateData('stores', post.id, post)
        .pipe()
        .subscribe(
          () => {},
          (error) => {
            this.toastr.error('Error while retrieving data');
            console.log(error);
          }
        );
    }
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
