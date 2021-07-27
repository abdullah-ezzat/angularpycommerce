import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsSidebarComponent } from '../../bs-sidebar/bs-sidebar.component';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { AddDataService } from 'src/app/api/add/add-data.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  ShoppingCartDetails: any;
  TotalCart: any;
  ProductCount: any;
  Currency: any;
  Cart: any;

  constructor(
    private all: GetAllService,
    private add: AddDataService,
    private route: Router,
    private toastr: ToastrService,
    private BsSidebar: BsSidebarComponent
  ) {}

  ngOnInit(): void {
    let cartId = localStorage.getItem('cartId');
    this.Cart = cartId;
    this.all.getAllCart(cartId).subscribe((response: any) => {
      this.ShoppingCartDetails = response;
      if (response.length > 0) {
        const prices = this.ShoppingCartDetails.map((item) => item.TotalPrice);
        const total = prices.reduce(this.total);
        this.TotalCart = total;

        const quantities = this.ShoppingCartDetails.map(
          (item) => item.Quantity
        );
        const sum = quantities.reduce(this.total);
        this.count(sum);
        localStorage.setItem('cart_count', sum);
        this.BsSidebar.CartItemCounter(sum);

        const currency = this.ShoppingCartDetails.map((item) => item.Currency);
        this.Currency = currency[0];
      } else {
        this.count(0);
        localStorage.removeItem('cart_count');
      }
    });
  }

  total(total, num) {
    return total + num;
  }

  count(count) {
    this.ProductCount = count;
  }

  updateQuantity(Id, Quantity) {
    this.add
      .updateCartQuantity(Id, Quantity)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          this.toastr.error('Error while retrieving data');
          console.log(error);
        }
      );
    this.reloadPage();
  }

  DeleteItem(Id) {
    this.add.deleteCartItem(Id).subscribe(() => {}),
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      };
    if (this.ProductCount == 1) {
      localStorage.removeItem('cart_count');
    }
    this.reloadPage();
  }

  DeleteAllItems() {
    let cartId = localStorage.getItem('cartId');
    this.add.deleteCart(cartId).subscribe(() => {}),
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      };
    localStorage.removeItem('cart_count');
    this.reloadPage();
  }

  checkOut() {
    let UserId = localStorage.getItem('UserId');
    localStorage.getItem('cartId');

    if (!UserId) {
      this.route.navigate(['/login']);
      this.toastr.error('You must login first.');
    } else {
      this.route.navigate(['/checkout']);
    }
  }

  reloadPage() {
    location.reload();
  }
  assign(url) {
    location.assign(url);
  }
}
