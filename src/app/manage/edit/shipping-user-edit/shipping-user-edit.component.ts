import { Component, OnInit } from '@angular/core';
import { ShippingUserModel } from '../../view/shipping-agent-user/shipping-agent-user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { AddDataService } from 'src/app/api/add/add-data.service';

@Component({
  selector: 'app-shipping-user-edit',
  templateUrl: './shipping-user-edit.component.html',
  styleUrls: ['./shipping-user-edit.component.css'],
})
export class ShippingUserEditComponent implements OnInit {
  shippingUser: any;
  ShippingUsers: any;
  Users: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private all: GetAllService,
    private get: GetDataService,
    private update: AddDataService
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.get
        .getData('shippingAgentUsers', id)
        .subscribe((response) => (this.shippingUser = response));
  }

  ngOnInit(): void {
    this.all.getAllData('shippingAgentUsers').subscribe(
      (response) => {
        this.ShippingUsers = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.all.getAllData('users').subscribe(
      (response) => {
        this.Users = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
  }

  updateShippingUser(post: ShippingUserModel) {
    this.update
      .updateData('shippingAgentUsers', post.id, post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );

    this.router.navigate(['/manage/shippingusers']);
  }
}
