import { Component, OnInit } from '@angular/core';
import { InventoryDetails } from '../../view/inventory-detail/inventory-detail.model';
import { GetDataApiService } from '../../../get-data-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-inventory-detail',
  templateUrl: './edit-inventory-detail.component.html',
  styleUrls: ['./edit-inventory-detail.component.css']
})
export class EditInventoryDetailComponent implements OnInit {

  store: any;
  Stores: any;

  product: any;
  Products: any;

  detail: any;
  Details: any;

  constructor(private router: Router, private service: GetDataApiService, private route: ActivatedRoute) { 
    let id = this.route.snapshot.paramMap.get('Id');
    if (id) this.service.getInventoryDetail(id).subscribe(response => this.detail = response);
  }

  ngOnInit(): void {

    this.service.getAllStores()
    .subscribe(response => {
      this.Stores = response;

    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });

    this.service.GetAllProducts()
    .subscribe(response => {
      this.Products = response;

    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });
  }

  updateDetail(post: InventoryDetails){
 
  ;

  this.service.updateInventoryDetail(post)
  .pipe().subscribe(response => {
   
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });
  this.router.navigate(['/inventoryDetail'])
}

}

