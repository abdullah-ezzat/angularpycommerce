import { Component, OnInit } from '@angular/core';
import { GetDataApiService } from '../get-data-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsSidebarComponent } from '../bs-sidebar/bs-sidebar.component'


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  ShoppingCartDetails: any;
  TotalCart: any;
  ProductCount: any;
  

  constructor(private service: GetDataApiService, private route: Router, private router: ActivatedRoute, private toastr: ToastrService, private BsSidebar: BsSidebarComponent) { 
   }

  ngOnInit(): void {
    let cartId = localStorage.getItem('cartId');
  
    this.service.getAllCarts(cartId)
    .subscribe(response => {
      this.ShoppingCartDetails = response;

    },);

    this.service.getCartTotal(cartId).then(response => {
        this.TotalCart = response;
    } );

    this.service.getProductCount(cartId).subscribe(response => {
        this.ProductCount = response;
        this.BsSidebar.CartItemCounter(this.ProductCount);
    })
  }

  updateQuantity(Id, Quantity){


    this.service.updateCartQuantity(Id, Quantity)
    .pipe().subscribe(response => {

      
    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });   
    location.reload();
  }

  DeleteItem(Id){
      this.service.DeleteFormItemCart(Id).subscribe(response => {
      })
      ,error => {
        alert('An unexpected error occured.');
        console.log(error);
      }
      location.reload();
  }

  DeleteAllItems(){
    
    let cartId = localStorage.getItem('cartId')
    this.service.DeleteAllCart(cartId).subscribe(response => {})

    ,error => {
      alert('An unexpected error occured.');
      console.log(error);}
    location.reload();
  }

  checkOut(){    

    let UserId =  localStorage.getItem('UserId');

    localStorage.getItem('cartId');

  if (!UserId){
    this.route.navigate(['/Login'])
    this.toastr.error('You must login first.');
  }else{
    this.route.navigate(['/Checkout'])
  }
  }
}
