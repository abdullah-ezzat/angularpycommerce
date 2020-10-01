import { Component, OnInit } from '@angular/core';
import { UserData } from '../login/userData.Model';
import { GetDataApiService } from '../get-data-api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  User: any;

  constructor(private router: Router, private service: GetDataApiService, private toastr: ToastrService) { 
  }

  ngOnInit(): void {

    let UserId = localStorage.getItem('UserId')

    this.service.getUser(UserId).subscribe(response => {
      this.User = response;
      console.log(this.User);
    })
    ,error => {
      alert('An unexpected error occured.');
      console.log(error);
    }

  }

  
updateUser(post : UserData){

  console.log(post);

  this.service.updateUser(post)
  .pipe().subscribe(response => {
  this.User = response;
    if(response == false){
      this.toastr.error('This Email or Username is Already Taken');
    }else{
      this.toastr.success('Your account has been updated');
    }
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });

  }

}
