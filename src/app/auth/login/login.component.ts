import { Component, OnInit } from '@angular/core';
import { LoginDetails } from './login.model';
import { UserData } from './userData.Model';
import { ToastrService } from 'ngx-toastr';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetDataService } from 'src/app/api/get/get-data.service';
import particles from '../particles.json';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isAuthenticated: any;
  userId: any;
  UserName: any;
  hide = true;
  User: any;
  particlesOptions = particles['particles'];

  constructor(
    private add: AddDataService,
    private get: GetDataService,
    private toastr: ToastrService
  ) {}
  async ngOnInit() {
    this.User = localStorage.getItem('UserName');

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
  }

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
  Login(post: LoginDetails) {
    console.log(post);
    var data = {
      Email: post.Email_login,
      Password: post.Password_login,
    };
    this.add
      .authUser(data)
      .pipe()
      .subscribe(
        async (response) => {
          await this.get
            .decryptData(response['token'], response['key'])
            .then((data) => {
              if (data != false) {
                var userData = this.mapResponse(data);
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
            });
        },
        (error) => {
          this.toastr.error('Error while logging in');
          console.log(error);
        }
      );
  }
  LoginAsGuest() {
    this.get
      .loginAsGuest()
      .pipe()
      .subscribe(
        async (response) => {
          await this.get
            .decryptData(response['token'], response['key'])
            .then((data) => {
              var userData = this.mapResponse(data);
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
            });
        },
        (error) => {
          this.toastr.error('Error while logging in');
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
