import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ShippingUserModel } from './shipping-agent-user.model';
import { GetAllService } from 'src/app/api/all/get-all.service';

@Component({
  selector: 'app-shipping-agent-user',
  templateUrl: './shipping-agent-user.component.html',
  styleUrls: ['./shipping-agent-user.component.css'],
})
export class ShippingAgentUserComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['id', 'UserId', 'ShippingAgentId', 'edit'];
  dataSource;
  ShippingAgentUser: any;

  constructor(private service: GetAllService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAllData('shippingAgentUsers').subscribe(
      (response) => {
        this.ShippingAgentUser = response;
        this.dataSource = new MatTableDataSource(this.ShippingAgentUser);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  shippingAgentUser() {
    this.ShippingAgentUser = new ShippingUserModel();
    this.router.navigate(['/manage/add/shippinguser', this.ShippingAgentUser]);
  }
}
