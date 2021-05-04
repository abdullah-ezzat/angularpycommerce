import { Component, OnInit } from '@angular/core';
import { GetDataApiService } from '../get-data-api.service';
import { HomeComponent } from '../screens/home/home.component';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private service: GetDataApiService,
    private home: HomeComponent,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.CategoryId = 0;
    let cartId = localStorage.getItem('cartId');
    this.service.getProductCount(cartId).subscribe((response) => {
      this.CartItemsCount = response;
    });
    this.service.getAllCategory().subscribe(
      (response) => {
        this.Categories = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.service.getSubCategory().subscribe(
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
      } else {
        this.toastr.error('You have logged out due to inactivity.');
        localStorage.removeItem('UserId');
      }
    }
  }
  onClickState() {
    this.state = !this.state;
  }

  Logout() {
    this.toastr.error('You have logged out.');
    localStorage.removeItem('UserId');
    localStorage.removeItem('UserName');
    location.assign('/');
  }

  CartItemCounter(NumberOfItems) {
    this.CartItemsCount = NumberOfItems;
  }

  AssignCategoryId(CategoryId) {
    localStorage.setItem('CategoryId', CategoryId);

    location.assign('/Home');
  }

  Home() {
    location.assign('/Home');
  }
}
