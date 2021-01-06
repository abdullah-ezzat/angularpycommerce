import { Component, OnInit } from '@angular/core';
import { GetDataApiService } from '../get-data-api.service';
import { UserData } from '../login/userData.Model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userRegister: any;
  userId: any;
  UserName: any;
  hide = true;

  constructor(private service: GetDataApiService, private route: Router,private toastr: ToastrService) { }


  ngOnInit(): void {
  }

  Register(post: UserData){

    
    ;
    this.service.userRegister(post)
    .pipe().subscribe(response => {
     
     if(response == 0){
      this.toastr.error('This email is existing.', '', {
        timeOut: 2000,
        positionClass: 'toast-top-center'
      });
     }
      var userData = this.mapResponse(response);
     
      var LoginDateStamp = this.service.updateLastActiveTime();
      localStorage.setItem("LastActiveTime", JSON.stringify(LoginDateStamp));
      localStorage.setItem("UserId",JSON.stringify(userData.Id));
      localStorage.setItem("UserName",userData.NameL );

      if (userData.Id > 0){
        localStorage.removeItem('cartId');
        location.assign('/')
        this.toastr.success('You have registered successfully.', '', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      }

    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });
  }

  mapResponse(response){
    
    var  userData : UserData = response;
    return  (userData);
  }
}
