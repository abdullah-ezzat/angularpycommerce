import { Component, OnInit } from '@angular/core';
import { UserData } from '../../auth/login/userData.Model';
import { ToastrService } from 'ngx-toastr';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { AddDataService } from 'src/app/api/add/add-data.service';
import key from '../../key.json';
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
    this.get.getUser(UserId).subscribe(async (response) => {
      await this.get
        .decryptData(response['token'], response['key'])
        .then(async (data) => {
          this.User = data;
          const password = this.User['Password'];
          await this.get
            .decryptData(password, key['key'], 'RSA')
            .then((data) => {
              this.User['Password'] = data;
            });
        });
    }),
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      };
  }

  updateUser(post: UserData) {
    this.add
      .updateUser(this.UserId, post)
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
          this.toastr.error('Error while retrieving data');
          console.log(error);
        }
      );
  }
  assign(url) {
    location.assign(url);
  }
}
