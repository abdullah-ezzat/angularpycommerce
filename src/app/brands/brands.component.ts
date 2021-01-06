import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataApiService } from '../get-data-api.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BrandsDetail } from './brands.model';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [ 'Id','NameA','NameL','edit' ];
  dataSource ;
  Brands: any;

  constructor(private service: GetDataApiService, private router: Router) { }

  ngOnInit(): void{
    
    this.service.getAllBrands ()
    .subscribe(response => {
      this.Brands = response;

      this.dataSource = new MatTableDataSource(this.Brands); 
      
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

  BrandsForm(){
    this.Brands = new BrandsDetail();

    this.router.navigate(['/brands-Form',this.Brands, ])

  }
}
