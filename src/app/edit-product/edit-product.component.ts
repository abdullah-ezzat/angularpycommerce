import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsDetail } from '../products/Products.model';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataApiService } from '../get-data-api.service';
import { SpecificationFormComponent } from '../specification-form/specification-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  category: any;
  Categories: any;

  ProductId: any;

  product: any;
  Products: any;
  
  brand: any;
  Brands: any;

  specification: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  displayedColumns: string[] = [ 'Id','ProductId','SpecificationName','SpecificationValue','edit' ];
  dataSource ;

  constructor(private router: Router, private service: GetDataApiService, private route: ActivatedRoute, private productSpecification: SpecificationFormComponent) { 
    let id = this.route.snapshot.paramMap.get('Id');
    this.ProductId = id;
    if (id) this.service.getProduct(id).subscribe(response => this.product = response);
  }


ngOnInit(): void {

  
  this.service.GetAllProducts()
  .subscribe(response => {
    this.Products  = response;

  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });


  this.service.getAllproductSpecifications(this.ProductId)
  .subscribe(response => {
    this.specification = response;

    this.dataSource = new MatTableDataSource(this.specification); 
    
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  },error => {
    alert('An unexpected error occured.');
    console.log(error);

  });

  this.service.getSubCategory()
  .subscribe(response => {
    this.Categories = response;

  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });

  this.service.getAllBrands()
  .subscribe(response => {
    this.Brands = response;

  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });
}
addProductSpecification(productId,CategoryId){

    localStorage.setItem('CategoryId', CategoryId)
    localStorage.setItem('SpecificationProductId', productId );
  
    this.router.navigate(['/specification-Form'])

}

copyFromProductSpecification(fromProductId,productId,CategoryId){

  this.service.copyFromProductSepcification(fromProductId,productId,CategoryId)
  .subscribe(response => {
    
     this.router.navigate(['/editProduct/'+productId])
    
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });

}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
    {   
  };
}

updateProduct(post : ProductsDetail){
 
  ;

  this.service.updateProduct(post)
  .pipe().subscribe(response => {
   
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });
  this.router.navigate(['products'])
  }
}


