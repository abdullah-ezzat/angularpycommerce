import { Component } from '@angular/core';
import { UserData } from '../login/userData.Model';
import { ToastrService } from 'ngx-toastr';
import { AddDataService } from 'src/app/api/add/add-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userRegister: any;
  userId: any;
  UserName: any;
  hide = true;

  constructor(private add: AddDataService, private toastr: ToastrService) {}

  Register(post: UserData) {
    this.add
      .registerUser(post)
      .pipe()
      .subscribe(
        (response) => {
          if (response == false) {
            this.toastr.error('This email is existing.', '', {
              timeOut: 2000,
              positionClass: 'toast-top-center',
            });
          }
          var userData = this.mapResponse(response);

          var LoginDateStamp = this.add.updateTimestamp();
          localStorage.setItem(
            'LastActiveTime',
            JSON.stringify(LoginDateStamp)
          );
          localStorage.setItem('UserId', JSON.stringify(userData.id));
          localStorage.setItem('UserName', userData.NameL);
          if (userData.id > 0) {
            localStorage.removeItem('cartId');
            this.toastr.success('You have registered successfully', '', {
              timeOut: 800,
              positionClass: 'toast-top-center',
            });
            setTimeout(function () {
              location.assign('/');
            }, 800);
          }
        },
        (error) => {
          this.toastr.error('Error while registering');
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
