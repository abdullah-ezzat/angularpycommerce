import { Component, OnInit } from '@angular/core';
import { BrandsDetail } from '../../view/brands/brands.model';
import { GetDataApiService } from '../../../get-data-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {

  brand: any;
  Brands: any;

  constructor(private router: Router, private service: GetDataApiService, private route: ActivatedRoute) { 
    let id = this.route.snapshot.paramMap.get('Id');
    if (id) this.service.getBrand(id).subscribe(response => this.brand = response);
  }

  ngOnInit(): void {

    this.service.getAllBrands()
    .subscribe(response => {
      this.Brands = response;

    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });
  }

  updateBrand(post: BrandsDetail){
 
  ;

  this.service.updateBrand(post)
  .pipe().subscribe(response => {
   
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });
  this.router.navigate(['/Brands'])
}

}

