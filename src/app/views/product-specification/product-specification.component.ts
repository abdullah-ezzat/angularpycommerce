import { Component, OnInit, ViewChild } from '@angular/core';
import { GetDataApiService } from '../../get-data-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductSpecificationDetails } from './product-specification.model';

@Component({
  selector: 'app-product-specification',
  templateUrl: './product-specification.component.html',
  styleUrls: ['./product-specification.component.css']
})
export class ProductSpecificationComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [ 'Id','ProductId','SpecificationName','SpecificationValue','edit' ];
  dataSource ;
  specification: any;
  ProductId: any;

  constructor(private service: GetDataApiService, private router: Router) { }

  ngOnInit(): void{
    
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
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
      {   
    };
  }

  addSpecification(){
    this.specification = new ProductSpecificationDetails();
    this.router.navigate(['specification-Form',this.specification ])
  }
}
