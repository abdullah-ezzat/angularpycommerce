import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryDetails } from './inventory-detail.model';
import { GetDataApiService } from '../get-data-api.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css']
})
export class InventoryDetailComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [ 'Id','StoreName','ProductName','Quantity','edit' ];
  dataSource ;
  Details: any;

  constructor(private service: GetDataApiService, private router: Router) { }

  ngOnInit(): void{
    
    this.service.getAllInventoryDetails ()
    .subscribe(response => {
      this.Details = response;

      this.dataSource = new MatTableDataSource(this.Details); 
      
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

       console.log( this.Details);
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

  DetailForm(){
    this.Details = new InventoryDetails();
    this.router.navigate(['inventoryDetail-Form',this.Details ])
    
  }
}
