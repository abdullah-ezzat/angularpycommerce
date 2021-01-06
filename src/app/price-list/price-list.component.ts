import { Component, OnInit, ViewChild } from '@angular/core';
import { PriceListDetails } from './price-list.model';
import { MatTableDataSource } from '@angular/material/table';
import { GetDataApiService } from '../get-data-api.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StoresDetail } from '../stores/Stores.model';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [ 'Id','VendorId','ProductId','CountryId','Price','edit' ];
  dataSource ;
  Prices: any;

  constructor(private service: GetDataApiService, private router: Router) { }

  ngOnInit(): void{
    
    this.service.getAllPrices ()
    .subscribe(response => {
      this.Prices = response;

      this.dataSource = new MatTableDataSource(this.Prices); 
      
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

  PriceListForm(){
    this.Prices = new StoresDetail();

    this.router.navigate(['priceForm',this.Prices, ])
    
  }
}
  
  