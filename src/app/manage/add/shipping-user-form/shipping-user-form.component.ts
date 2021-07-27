import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShippingUserModel } from '../../view/shipping-agent-user/shipping-agent-user.model';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { ToastrService } from 'ngx-toastr';
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
    private add: AddDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.all.getAllData('users').subscribe(
      async (response) => {
        await this.all
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.Users = data;
          });
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );

    this.all.getAllData('shippingAgentUsers').subscribe(
      async (response) => {
        await this.all
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.ShippingUsers = data;
          });
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
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
          this.toastr.error('Error while retrieving data');
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
