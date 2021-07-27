import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  ShoppingCartDetails: any;
  Checkout: any;
  TotalCart: any;
  Currency: any;
  User: any;
  UserId: any;
  cartId: any;
  orderIsPlaced: any = 0;

  constructor(
    private count: ShoppingCartComponent,
    private all: GetAllService,
    private add: AddDataService,
    private get: GetDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let cartId = localStorage.getItem('cartId');
    this.all.getAllCart(cartId).subscribe(
      (response) => {
        this.Checkout = response;
        const prices = this.Checkout.map((item) => item.TotalPrice);
        const total = prices.reduce(this.total);
        this.TotalCart = total;

        const currency = this.Checkout.map((item) => item.Currency);
        this.Currency = currency[0];
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );

    let UserId = localStorage.getItem('UserId');
    this.get.getUser(UserId).subscribe(async (response) => {
      await this.get
        .decryptData(response['token'], response['key'])
        .then((data) => {
          this.User = data;
        });
    }),
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      };
    this.Checkout = { ProductName: '' };
  }
  total(total, num) {
    return total + num;
  }
  createOrder() {
    let cartId = localStorage.getItem('cartId');
    let UserId = localStorage.getItem('UserId');

    this.add.addOrder(cartId, UserId).subscribe((response) => {
      if (response > 0) {
        this.toastr.success(
          'order has been placed to the identified address',
          'Your order number is ' + response,
          { timeOut: 3500 }
        );
        this.orderIsPlaced = 1;
        this.count.count(0);
        localStorage.removeItem('cartId');
        localStorage.removeItem('cart_count');
        location.assign('/orders');
      }
    }),
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      };
  }
  assign(url) {
    location.assign(url);
  }
}
