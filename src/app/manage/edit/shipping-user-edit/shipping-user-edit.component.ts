import { Component, OnInit } from '@angular/core';
import { ShippingUserModel } from '../../view/shipping-agent-user/shipping-agent-user.model';
import { ActivatedRoute } from '@angular/router';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-shipping-user-edit',
  templateUrl: './shipping-user-edit.component.html',
  styleUrls: ['./shipping-user-edit.component.css'],
})
export class ShippingUserEditComponent implements OnInit {
  shippingUser: any;
  ShippingUsers: any;
  filteredShippingUsers: any;
  Users: any;
  filteredUsers: any;

  constructor(
    private route: ActivatedRoute,
    private all: GetAllService,
    private get: GetDataService,
    private update: AddDataService,
    private toastr: ToastrService
  ) {
    let id = this.route.snapshot.paramMap.get('Id');
    if (id)
      this.get.getData('shippingAgentUsers', id).subscribe(async (response) => {
        await this.get
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.shippingUser = data;
          });
      });
  }

  ngOnInit(): void {
    this.all.getAllData('shippingAgentUsers').subscribe(
      async (response) => {
        await this.get
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.ShippingUsers = data;
            this.filteredShippingUsers = this.ShippingUsers.slice();
          });
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );

    this.all.getAllData('users').subscribe(
      (response) => {
        this.Users = response;
        this.filteredUsers = this.Users.slice();
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );
    this.shippingUser = ShippingUserModel;
  }

  updateShippingUser(post: ShippingUserModel) {
    post.id = this.shippingUser.id;
    this.update
      .updateData('shippingAgentUsers', post.id, post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          this.toastr.error('Error while retrieving data');
          console.log(error);
        }
      );

    location.assign('/manage/shippingusers');
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
