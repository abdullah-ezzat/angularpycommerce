import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { Observable } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MapDialogComponent } from 'src/app/views/map-dialog/map-dialog.component';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  Orders: any;
  Masters: any;
  Currency: any;
  MapUrl: SafeResourceUrl;
  MapLocation: any;
  stepperOrientation: Observable<StepperOrientation>;
  User: any;

  constructor(
    private get: GetDataService,
    public sanitizer: DomSanitizer,
    breakpointObserver: BreakpointObserver,
    public dialog: MatDialog
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    let UserId = localStorage.getItem('UserId');
    this.User = UserId;
    this.get.getOrdersMaster(UserId).subscribe((response) => {
      this.Masters = response;
    });
    this.get.getOrders(UserId).subscribe((response) => {
      this.Orders = response;
      const currency = this.Orders.map((item) => item.Currency);
      this.Currency = currency[0];
    });
  }

  getMapUrl(Latitude, Longitude) {
    var location = Latitude + ',' + Longitude;
    this.MapLocation =
      'https://maps.google.com/maps?q=' +
      location +
      '&hl=en&z=16&amp&output=embed';
    this.MapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.MapLocation
    );
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  assign(url) {
    location.assign(url);
  }

  openDialog(Latitude, Longitude, Order) {
    this.getMapUrl(Latitude, Longitude);
    this.dialog.open(MapDialogComponent, {
      width: '100%',
      height: '90%',
      data: {
        MapUrl: this.MapUrl,
        order: Order,
      },
    });
  }
}
