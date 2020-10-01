import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataApiService } from '../get-data-api.service';
import { BrandsDetail } from '../brands/brands.model';

@Component({
  selector: 'app-brands-form',
  templateUrl: './brands-form.component.html',
  styleUrls: ['./brands-form.component.css']
})
export class BrandsFormComponent implements OnInit {

  brand: any;
  Brands: any;

constructor(private route: Router, private service: GetDataApiService) { }

ngOnInit(): void {
  this.service.getAllBrands()
  .subscribe(response => {
    this.Brands = response;
    
     console.log( this.Brands);
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });
}

saveBrand(post : BrandsDetail){

  console.log(post);
  this.service.addNewBrand(post)
  .pipe().subscribe(response => {
      
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });

  this.route.navigate(['Brands'])
}
}
