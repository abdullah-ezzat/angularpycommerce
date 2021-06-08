import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataApiService } from '../../../get-data-api.service';
import { StoresDetail } from '../../view/stores/Stores.model';

@Component({
  selector: 'app-stores-form',
  templateUrl: './stores-form.component.html',
  styleUrls: ['./stores-form.component.css'],
})
export class StoresFormComponent implements OnInit {
  store: any;
  Stores: any;

  vendor: any;
  Vendors: any;

  Country: any;
  Countries: any;

  shippingAgent: any;
  ShippingAgents: any;

  constructor(
    private route: Router,
    private service: GetAllService,
    private add: AddDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.service.getAllData('vendors').subscribe(
      (response) => {
        this.Vendors = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.service.getAllData('shippingAgents').subscribe(
      (response) => {
        this.ShippingAgents = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.service.getAllData('categories').subscribe(
      (response) => {
        this.Countries = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
  }

  saveStore(post: StoresDetail) {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition, error, options);
    } else {
      this.toastr.error('You must allow location to get coordinates');
    }

    function setPosition(position) {
      post.Latitude = position.coords.latitude;
      post.Longitude = position.coords.longitude;
    }
    if (post.Latitude || post.Longitude == null) {
      this.toastr.error('You must allow location to get coordinates');
    } else {
      location.assign('/manage/stores');
    }
    this.add
      .addData('stores', post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );

    this.route.navigate(['Stores']);
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
