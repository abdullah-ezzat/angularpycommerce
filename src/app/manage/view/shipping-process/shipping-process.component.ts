import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { Notes } from './Notes.model';
@Component({
  selector: 'app-shipping-process',
  templateUrl: './shipping-process.component.html',
  styleUrls: ['./shipping-process.component.css'],
})
export class ShippingProcessComponent implements OnInit {
  Orders: any;
  Details: any;
  Masters: any;
  Currency: any;

  constructor(
    private add: AddDataService,
    private all: GetAllService,
    private get: GetDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let UserId = localStorage.getItem('UserId');

    this.get.getOrdersShipping(UserId).subscribe((response) => {
      this.Orders = response;
      const currency = this.Orders.map((item) => item.Currency);
      this.Currency = currency[0];
    });

    this.get.getShippingDetails(UserId).subscribe((response) => {
      this.Details = response;
    });

    this.get.getOrdersMaster(UserId).subscribe((response) => {
      this.Masters = response;
    });
  }

  addDeliveryNotes(post: Notes, OrderId) {
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
      location.reload();
    }

    let UserId = localStorage.getItem('UserId');
    this.add.addNotes(post, OrderId, UserId).subscribe(() => {});
  }

  DeliverOrder(OrderId) {
    let UserId = localStorage.getItem('UserId');
    this.add.deliverOrder(OrderId, UserId).subscribe(() => {
      location.reload();
    });
  }

  getFilteredOrders(StatusId) {
    let UserId = localStorage.getItem('UserId');
    this.all.getOrdersFilterd(UserId, StatusId).subscribe((response) => {
      this.Orders = response;
    });

    this.get.getShippingDetails(UserId).subscribe((response) => {
      this.Details = response;
    });
  }

  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
