import { Component, OnInit } from '@angular/core';
import { GetDataApiService } from '../../../get-data-api.service';
import { Router } from '@angular/router';
import { InventoryDetails } from '../../view/inventory-detail/inventory-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inventory-detail-form',
  templateUrl: './inventory-detail-form.component.html',
  styleUrls: ['./inventory-detail-form.component.css']
})
export class InventoryDetailFormComponent implements OnInit {

  detail: any;
  Details: any;

  store: any;
  Stores: any;

  product: any;
  Products: any;

  checkExist: any;

constructor(private route: Router, private service: GetDataApiService, private toastr: ToastrService) { }



ngOnInit(): void {

  this.service.GetAllProducts()
  .subscribe(response => {
    this.Products  = response;

  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });

  this.service.getAllStores()
  .subscribe(response => {
    this.Stores = response;

  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });
}

saveDetail(post : InventoryDetails){

  this.service.checkPriceListExist(post.StoreId, post.ProductId)
  .pipe().subscribe(response => {
    if (response == true) {
      this.service.addNewInventoryDetail(post)
      .pipe().subscribe(response => {
      },error => {
        alert('An unexpected error occured.');
        console.log(error);
      });
      this.route.navigate(['/inventoryDetail'])
    }
    else{
      this.toastr.error("This product doesn't exist in price list. Click here to add it.")
      .onTap
      .subscribe(() => 
      this.route.navigate(["/priceForm"])
      );
    }
   } );
}

}
