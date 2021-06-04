import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { Observable } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

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
  constructor(
    private get: GetDataService,
    public sanitizer: DomSanitizer,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    let UserId = localStorage.getItem('UserId');
    this.get.getOrders(UserId).subscribe((response) => {
      this.Orders = response;
      const currency = this.Orders.map((item) => item.Currency);
      this.Currency = currency[0];
    });
    this.get.getOrdersMaster(UserId).subscribe((response) => {
      this.Masters = response;
    });
  }

  getMapUrl(Longitude, Latitude) {
    this.MapLocation = Longitude + ',' + Latitude;
    this.MapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.MapLocation
    );
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
}
