import { Component } from '@angular/core';
import { GetDataApiService } from '../../get-data-api.service';
import { LoginDetails } from './login.model';
import { UserData } from './userData.Model';
import { ToastrService } from 'ngx-toastr';
import { AddDataService } from 'src/app/api/add/add-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isAuthenticated: any;
  userId: any;
  UserName: any;
  hide = true;

  constructor(private add: AddDataService, private toastr: ToastrService) {}

  Login(post: LoginDetails) {
    this.add
      .authUser(post)
      .pipe()
      .subscribe(
        (response) => {
          if (response != false) {
            var userData = this.mapResponse(response);
            var LoginDateStamp = this.add.updateTimestamp();
            localStorage.setItem(
              'LastActiveTime',
              JSON.stringify(LoginDateStamp)
            );
            localStorage.setItem('UserId', JSON.stringify(userData.id));
            localStorage.setItem('UserName', userData.NameL);
            if (userData.id > 0) {
              this.toastr.success('You have logged in successfully', '', {
                timeOut: 700,
              });
              setTimeout(function () {
                location.assign('/');
              }, 700);
            }
          } else {
            this.toastr.error('This email/password is invalid');
          }
        },
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );
  }

  mapResponse(response) {
    var userData: UserData = response;
    return userData;
  }
  assign(url) {
    location.assign(url);
  }
}
