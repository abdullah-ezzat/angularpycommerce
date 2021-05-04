import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataApiService } from '../../../get-data-api.service';
import { StoresDetail } from '../../view/stores/Stores.model';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.css']
})
export class EditStoreComponent implements OnInit {

  vendor: any;
  Vendors: any;

  store: any;
  
  ShippingAgents: any;

  Country: any;
  Countries: any;
  
  constructor(private router: Router, private service: GetDataApiService, private route: ActivatedRoute) { 
    let id = this.route.snapshot.paramMap.get('Id');
    if (id) this.service.getStore(id).subscribe(response => this.store = response);
  }

  ngOnInit(): void {

    this.service.getAllShippingAgents()
    .subscribe(response => {
      this.ShippingAgents = response;

    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });

    this.service.getAllVendors()
    .subscribe(response => {
      this.Vendors = response;

    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });

    this.service.getAllCountries()
    .subscribe(response => {
      this.Countries = response;

    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });
  }

updateStore(post: StoresDetail){
  post.MapLocation =  post.MapLocation.replace("<iframe src=", "");
  post.MapLocation =  post.MapLocation.replace("></iframe>", "");

  ;

  this.service.updateStore(post)
  .pipe().subscribe(response => {
   
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });

    this.router.navigate(['/Stores'])
    
}

}

