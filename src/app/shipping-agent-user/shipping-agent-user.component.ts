import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GetDataApiService } from '../get-data-api.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ShippingUserModel } from './shipping-agent-user.model';

@Component({
  selector: 'app-shipping-agent-user',
  templateUrl: './shipping-agent-user.component.html',
  styleUrls: ['./shipping-agent-user.component.css']
})
export class ShippingAgentUserComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [ 'Id','UserId','ShippingAgentId','edit' ];
  dataSource ;
  ShippingAgentUser: any;

  constructor(private service: GetDataApiService, private router: Router) { }

  ngOnInit(): void{
    
    this.service.getShippingUsers ()
    .subscribe(response => {
      this.ShippingAgentUser = response;

      this.dataSource = new MatTableDataSource(this.ShippingAgentUser); 
      
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

       console.log( this.ShippingAgentUser);
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

  shippingAgentUser(){
    this.ShippingAgentUser = new ShippingUserModel();
    this.router.navigate(['shippingUserForm',this.ShippingAgentUser, ])
    
  }
}
