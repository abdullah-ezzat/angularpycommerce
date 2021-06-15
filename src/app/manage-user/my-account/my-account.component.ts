import { Component, OnInit } from '@angular/core';
import { UserData } from '../../auth/login/userData.Model';
import { ToastrService } from 'ngx-toastr';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { AddDataService } from 'src/app/api/add/add-data.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit {
  User: any;
  UserId: any;

  constructor(
    private get: GetDataService,
    private add: AddDataService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    let UserId = localStorage.getItem('UserId');
    this.UserId = UserId;
    this.get.getUser(UserId).subscribe((response) => {
      this.User = response;
    }),
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      };
  }

  updateUser(post: UserData) {
    this.add
      .updateData('users', post.id, post)
      .pipe()
      .subscribe(
        (response) => {
          this.User = response;
          if (response == false) {
            this.toastr.error('This email or username is already taken');
          } else {
            this.toastr.success('Your account has been updated');
          }
        },
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );
  }
  assign(url) {
    location.assign(url);
  }
}
