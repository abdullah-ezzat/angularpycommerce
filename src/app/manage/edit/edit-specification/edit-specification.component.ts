import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataApiService } from '../../../get-data-api.service';
import { ProductSpecificationDetails } from '../../../views/product-specification/product-specification.model';

@Component({
  selector: 'app-edit-specification',
  templateUrl: './edit-specification.component.html',
  styleUrls: ['./edit-specification.component.css']
})
export class EditSpecificationComponent implements OnInit {
 
  specification: any;
  product: any;
  Products: any;

  ProductId: any;
  category: any;
  Categories: any;
  
  constructor(private router: Router, private service: GetDataApiService, private route: ActivatedRoute) { 
    let id = this.route.snapshot.paramMap.get('Id');
    this.ProductId = id;
    if (id) this.service.getProductSpecification(id).subscribe(response => this.specification = response);
  }

  ngOnInit(): void {

    this.service.GetAllProducts()
    .subscribe(response => {
      this.Products = response;

    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });

    this.service.getAllCategory()
    .subscribe(response => {
      this.Categories = response;

    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });
  }

updateProductSpecification(post: ProductSpecificationDetails){
 
  ;

  this.service.updateProductSpecification(post)
  .pipe().subscribe(response => {
   
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });

    this.router.navigate(['/editProduct/' + this.ProductId])
}

}

