import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryDetails } from './inventory-detail.model';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css'],
})
export class InventoryDetailComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = [
    'id',
    'ProductName',
    'StoreName',
    'Quantity',
    'TransType',
    'edit',
  ];
  dataSource;
  Details: any;

  constructor(
    private all: GetAllService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.all.getAllData('inventoryDetails').subscribe(
      async (response) => {
        await this.all
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.Details = data;
          });
        this.dataSource = new MatTableDataSource(this.Details);
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

  DetailForm() {
    this.Details = new InventoryDetails();
    this.router.navigate(['manage/add/inventory', this.Details]);
  }
}
