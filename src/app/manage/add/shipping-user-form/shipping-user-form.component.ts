import { Component, OnInit } from '@angular/core';
import { GetDataApiService } from '../../../get-data-api.service';
import { Router } from '@angular/router';
import { ShippingUserModel } from '../../view/shipping-agent-user/shipping-agent-user.model';

@Component({
  selector: 'app-shipping-user-form',
  templateUrl: './shipping-user-form.component.html',
  styleUrls: ['./shipping-user-form.component.css']
})
export class ShippingUserFormComponent implements OnInit {

  ShippingUsers: any;
  Users: any;
 
constructor(private route: Router, private service: GetDataApiService) { }

ngOnInit(): void {

  this.service.getAllUsers()
  .subscribe(response => {
    this.Users  = response;

  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });
 
  this.service.getAllShippingAgents()
  .subscribe(response => {
    this.ShippingUsers  = response;

  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });
}

createShippingUser(post : ShippingUserModel){

  ;
  this.service.addNewShippingUser(post)
  .pipe().subscribe(response => {
      
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });

  this.route.navigate(['/shippingAgentUser'])
}
}
