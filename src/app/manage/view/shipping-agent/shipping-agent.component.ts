import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ShippingAgentDetails } from './shipping-agent.model';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-shipping-agent',
  templateUrl: './shipping-agent.component.html',
  styleUrls: ['./shipping-agent.component.css'],
})
export class ShippingAgentComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['id', 'NameL', 'Email', 'Phone', 'edit'];
  dataSource;
  ShippingAgents: any;

  constructor(
    private all: GetAllService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.all.getAllData('shippingAgents').subscribe(
      async (response) => {
        await this.all
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.ShippingAgents = data;
          });
        this.dataSource = new MatTableDataSource(this.ShippingAgents);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  shippingAgent() {
    this.ShippingAgents = new ShippingAgentDetails();
    this.router.navigate(['/manage/add/shippingagent', this.ShippingAgents]);
  }
}
