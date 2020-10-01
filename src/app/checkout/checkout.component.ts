import { Component, OnInit } from '@angular/core';
import { GetDataApiService } from '../get-data-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsSidebarComponent } from '../bs-sidebar/bs-sidebar.component';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  ShoppingCartDetails: any;
  Checkout: any;
  TotalCart: any
  User: any;
  UserId: any;
  cartId: any;

  orderIsPlaced: any = 0;


  constructor(private service: GetDataApiService, private route: Router, private router: ActivatedRoute, private toastr: ToastrService, private BsSidebar: BsSidebarComponent) {
  }

  ngOnInit(): void {
    let cartId = localStorage.getItem('cartId');
  
    this.service.getAllCarts(cartId)
    .subscribe(response => {
      this.Checkout = response;
       console.log( this.Checkout);
    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });

    this.service.getCartTotal(cartId).then(response => {
      console.log(response);
        this.TotalCart = response;
    } );

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

  createOrder(){

    let cartId = localStorage.getItem('cartId');

    let UserId = localStorage.getItem('UserId');
 
    this.service.addNewOrder(cartId,UserId).subscribe(response => {
      console.log(response);
        if (response > 0){

          this.toastr.success('Your Order Has Been Placed To The Identified Adress And Your Order Number Is '+ response , '', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          this.orderIsPlaced = 1;
          localStorage.removeItem('cartId');
          this.route.navigate(['/myOrders']);
          this.BsSidebar.CartItemCounter(0);
        }

    })
    ,error => {
      alert('An unexpected error occured.');
      console.log(error);
    }

  }
}
