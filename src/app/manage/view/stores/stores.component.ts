import { Component, OnInit, ViewChild } from '@angular/core';
import { StoresDetail } from './Stores.model';
import { MatTableDataSource } from '@angular/material/table';
import { GetDataApiService } from '../../../get-data-api.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [ 'Id','VendorName','NameL','email','ShippingAgentName','CountryName','edit' ];
  dataSource ;
  Stores: any;

  constructor(private service: GetDataApiService, private router: Router) { }

  ngOnInit(): void{
    
    this.service.getAllStores ()
    .subscribe(response => {
      this.Stores = response;

      this.dataSource = new MatTableDataSource(this.Stores); 
      
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

  StoresForm(){
    this.Stores = new StoresDetail();
    this.router.navigate(['stores-Form',this.Stores, ])
    
  }
}
