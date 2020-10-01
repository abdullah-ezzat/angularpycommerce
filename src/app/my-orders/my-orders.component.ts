import { Component, OnInit } from '@angular/core';
import { GetDataApiService } from '../get-data-api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {

  Orders: any;
  Masters: any;
  MapUrl : SafeResourceUrl;
  MapLocation : any; 
  constructor(private service: GetDataApiService, private router: Router, private  _formBuilder: FormBuilder,public sanitizer: DomSanitizer) {
    // this.MapUrl = sanitizer.bypassSecurityTrustResourceUrl(this.MapLocation);
   }

  ngOnInit(): void {

    let UserId = localStorage.getItem('UserId');

    this.service.getOrders(UserId).subscribe(response => {
      this.Orders = response;
      console.log(this.Orders);
    })

    this.service.getOrderMaster(UserId).subscribe(response => {
      this.Masters = response;
      console.log(this.Masters);
    })

  }

  getMapUrl(orderId){
    this.service.getMapLocation(orderId).then(response => {
    
    if(response){
      this.MapLocation = response;
      this.MapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.MapLocation);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
     console.log(this.MapUrl);
    });

  }

}


