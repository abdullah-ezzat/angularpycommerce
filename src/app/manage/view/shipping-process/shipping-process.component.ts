import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { GetDataApiService } from '../../../get-data-api.service';
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

  constructor(
    private add: AddDataService,
    private all: GetAllService,
    private get: GetDataService
  ) {}

  ngOnInit(): void {
    let UserId = localStorage.getItem('UserId');

    this.get.getOrdersShipping(UserId).subscribe((response) => {
      this.Orders = response;
    });

    this.get.getShippingDetails(UserId).subscribe((response) => {
      this.Details = response;
    });

    this.get.getOrdersMaster(UserId).subscribe((response) => {
      this.Masters = response;
    });
  }

  addDeliveryNotes(post: Notes, OrderId) {
    console.log(OrderId);
    console.log(post);
    let UserId = localStorage.getItem('UserId');
    this.add.addNotes(post, OrderId, UserId).subscribe(() => {
      location.reload();
    });
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
}
