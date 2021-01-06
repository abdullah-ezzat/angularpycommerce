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
    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });

    this.service.getCartTotal(cartId).then(response => {
      ;
        this.TotalCart = response;
    } );

    let UserId = localStorage.getItem('UserId')

    this.service.getUser(UserId).subscribe(response => {
      this.User = response;

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
      ;
        if (response > 0){

          this.toastr.success('Your order has been placed to the identified adress and your order number is '+ response , '', {
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
