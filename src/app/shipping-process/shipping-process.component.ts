import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataApiService } from '../get-data-api.service';

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
    private service: GetDataApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let UserId = localStorage.getItem('UserId');

    this.service.getOrdersForShipping(UserId).subscribe((response) => {
      this.Orders = response;
    });

    this.service.getShippingDetails(UserId).subscribe((response) => {
      this.Details = response;
    });

    this.service.getOrderMaster(UserId).subscribe((response) => {
      this.Masters = response;
    });
  }

  addDeliveryNotes(DeliveryNote, OrderId, MapLocation, Latitude, Longitude) {
    let UserId = localStorage.getItem('UserId');
    this.service
      .addDeliveryNote(
        DeliveryNote,
        OrderId,
        UserId,
        MapLocation,
        Latitude,
        Longitude
      )
      .subscribe((response) => {
        location.reload();
      });
  }

  DeliverOrder(OrderId) {
    let UserId = localStorage.getItem('UserId');
    this.service.DeliverOrder(OrderId, UserId).subscribe((response) => {

      location.reload();
    });
  }

  getFilteredOrders(StatusId) {
    let UserId = localStorage.getItem('UserId');

    this.service
      .getOrdersForShippingFilterd(UserId, StatusId)
      .subscribe((response) => {
        this.Orders = response;
      });

    this.service.getShippingDetails(UserId).subscribe((response) => {
      this.Details = response;
    });
  }
}
