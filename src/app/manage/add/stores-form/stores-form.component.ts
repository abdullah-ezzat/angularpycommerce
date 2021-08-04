import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetAllService } from 'src/app/api/all/get-all.service';

import { StoresDetail } from '../../view/stores/Stores.model';

@Component({
  selector: 'app-stores-form',
  templateUrl: './stores-form.component.html',
  styleUrls: ['./stores-form.component.css'],
})
export class StoresFormComponent implements OnInit {
  Vendors: any;
  filteredVendors: any;
  Countries: any;
  filteredCountries: any;
  ShippingAgents: any;
  filteredShippingAgents: any;

  constructor(
    private all: GetAllService,
    private add: AddDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.all.getAllData('vendors').subscribe(
      async (response) => {
        await this.all
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

    this.all.getAllData('shippingAgents').subscribe(
      async (response) => {
        await this.all
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

    this.all.getAllData('countries').subscribe(
      async (response) => {
        await this.all
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
  }

  saveStore(post: StoresDetail) {
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

    if ((post.Latitude || post.Longitude) == null) {
      this.toastr.error('You must allow location to get coordinates');
    } else {
      location.assign('/manage/stores');
      this.add
        .addData('stores', post)
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
