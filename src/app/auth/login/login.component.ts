import { Component, OnInit} from '@angular/core';
import { GetDataApiService } from '../../get-data-api.service';
import { LoginDetails } from './login.model';
import { UserData } from './userData.Model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isAuthenticated: any;
  userId: any;
  UserName: any;
  hide = true;

  constructor(private service: GetDataApiService, private toastr: ToastrService) { }


  ngOnInit(): void {

  }

  Login(post: LoginDetails){

    ;
    this.service.userAuthentication(post)
    .pipe().subscribe(response => {

      if(response != false){
        var userData = this.mapResponse(response);
     
        var LoginDateStamp = this.service.updateLastActiveTime();
        localStorage.setItem("LastActiveTime", JSON.stringify(LoginDateStamp));
        localStorage.setItem("UserId",JSON.stringify(userData.Id));
        localStorage.setItem("UserName",userData.NameL );
  
        if (userData.Id > 0){
        this.toastr.success('You have logged in successfully.');
        location.assign('/');
        }
      }
      else{
        this.toastr.error('This email or password is invalid.');
      }
    }   
    ,error => {
      alert('An unexpected error occured.');
      console.log(error);
    });

  }

  mapResponse(response){
    
    var  userData : UserData = response;
    return  (userData);
  }
  
}
