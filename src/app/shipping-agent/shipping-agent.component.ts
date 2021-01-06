import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { GetDataApiService } from '../get-data-api.service';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ShippingAgentDetails } from './shipping-agent.model';

@Component({
  selector: 'app-shipping-agent',
  templateUrl: './shipping-agent.component.html',
  styleUrls: ['./shipping-agent.component.css']
})
export class ShippingAgentComponent implements OnInit {
 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [ 'Id','NameA','NameL','Email','Phone','edit' ];
  dataSource ;
  ShippingAgent: any;

  constructor(private service: GetDataApiService, private router: Router) { }

  ngOnInit(): void{
    
    this.service.getAllShippingAgents ()
    .subscribe(response => {
      this.ShippingAgent = response;

      this.dataSource = new MatTableDataSource(this.ShippingAgent); 
      
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

  shippingAgent(){
    this.ShippingAgent = new ShippingAgentDetails();
    this.router.navigate(['shippingAgent-Form',this.ShippingAgent, ])
  }
}
