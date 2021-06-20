import { Component, OnInit } from '@angular/core';

import { HomeComponent } from '../screens/home/home.component';
import { ToastrService } from 'ngx-toastr';
import { GetAllService } from '../api/all/get-all.service';

@Component({
  selector: 'bs-sidebar',
  templateUrl: './bs-sidebar.component.html',
  styleUrls: ['./bs-sidebar.component.css'],
})
export class BsSidebarComponent implements OnInit {
  state: boolean;
  Categories: any;
  subCategories: any;
  isAuthenticated: any;
  userObject: any;
  userName: any;
  CartItemsCount: any;
  mainId: BigInteger;
  CategoryId: number;

  constructor(private all: GetAllService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.CategoryId = 0;
    let cart_count = localStorage.getItem('cart_count');
    this.CartItemsCount = cart_count;
    this.all.getAllCategories().subscribe(
      (response) => {
        this.Categories = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.all.getSubCategories().subscribe(
      (response) => {
        this.subCategories = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    var LastActiveTime = JSON.parse(localStorage.getItem('LastActiveTime'));
    var userId = JSON.parse(localStorage.getItem('UserId'));
    var CheckTime = new Date();
    var CheckTimeStamp = CheckTime.getTime();
    var DifferrenceBetweenLoginAndCheck = CheckTimeStamp - LastActiveTime;
    var seconds = DifferrenceBetweenLoginAndCheck / 1000;

    if (userId > 0) {
      if (seconds < 1800) {
        this.userName = localStorage.getItem('UserName');
        localStorage.setItem('LastActiveTime', JSON.stringify(CheckTimeStamp));
      } else {
        this.toastr.error('Due to inactivity', 'You have been logged out');
        localStorage.removeItem('UserId');
        localStorage.removeItem('UserName');
        localStorage.removeItem('LastActiveTime');
      }
    }
  }
  onClickState() {
    this.state = !this.state;
  }

  Logout() {
    this.toastr.error('You have logged out');
    localStorage.removeItem('UserId');
    localStorage.removeItem('UserName');
    this.assign('/');
  }

  CartItemCounter(NumberOfItems) {
    this.CartItemsCount = NumberOfItems;
  }

  AssignCategoryId(CategoryId) {
    localStorage.setItem('CategoryId', CategoryId);
    this.assign('/Home');
  }

  assign(url) {
    location.assign(url);
  }
}
