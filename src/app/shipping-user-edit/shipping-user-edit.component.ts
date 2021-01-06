import { Component, OnInit } from '@angular/core';
import { ShippingUserModel } from '../shipping-agent-user/shipping-agent-user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataApiService } from '../get-data-api.service';

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
    private service: GetDataApiService,
    private route: ActivatedRoute
  ) {
    let id = this.route.snapshot.paramMap.get('Id');
    if (id)
      this.service
        .getShippingUser(id)
        .subscribe((response) => (this.shippingUser = response));
  }

  ngOnInit(): void {
    this.service.getAllShippingAgents().subscribe(
      (response) => {
        this.ShippingUsers = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.service.getAllUsers().subscribe(
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
    ;

    this.service
      .updateShippingUser(post)
      .pipe()
      .subscribe(
        (response) => {},
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );

    this.router.navigate(['/shippingAgentUser']);
  }
}
