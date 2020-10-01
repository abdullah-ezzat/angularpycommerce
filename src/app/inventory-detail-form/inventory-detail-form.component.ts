import { Component, OnInit } from '@angular/core';
import { GetDataApiService } from '../get-data-api.service';
import { Router } from '@angular/router';
import { InventoryDetails } from '../inventory-detail/inventory-detail.model';

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

constructor(private route: Router, private service: GetDataApiService) { }

ngOnInit(): void {

  this.service.GetAllProducts()
  .subscribe(response => {
    this.Products  = response;
    
     console.log( this.Products);
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });

  this.service.getAllStores()
  .subscribe(response => {
    this.Stores = response;
    
     console.log( this.Stores);
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });
}

saveDetail(post : InventoryDetails){

  console.log(post);
  this.service.addNewInventoryDetail(post)
  .pipe().subscribe(response => {
      console.log(response);
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });
  this.route.navigate(['/inventoryDetail'])
}
}
