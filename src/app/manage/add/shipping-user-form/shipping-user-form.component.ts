import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShippingUserModel } from '../../view/shipping-agent-user/shipping-agent-user.model';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { AddDataService } from 'src/app/api/add/add-data.service';

@Component({
  selector: 'app-shipping-user-form',
  templateUrl: './shipping-user-form.component.html',
  styleUrls: ['./shipping-user-form.component.css'],
})
export class ShippingUserFormComponent implements OnInit {
  ShippingUsers: any;
  Users: any;

  constructor(
    private route: Router,
    private all: GetAllService,
    private add: AddDataService
  ) {}

  ngOnInit(): void {
    this.all.getAllData('users').subscribe(
      (response) => {
        this.Users = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.all.getAllData('shippingAgentUsers').subscribe(
      (response) => {
        this.ShippingUsers = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
  }

  createShippingUser(post: ShippingUserModel) {
    this.add
      .addData('shippingAgentUsers', post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );

    this.route.navigate(['/manage/shippingusers']);
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
