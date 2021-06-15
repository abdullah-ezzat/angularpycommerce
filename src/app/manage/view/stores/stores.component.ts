import { Component, OnInit, ViewChild } from '@angular/core';
import { StoresDetail } from './Stores.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GetAllService } from 'src/app/api/all/get-all.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css'],
})
export class StoresComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = [
    'id',
    'VendorName',
    'NameL',
    'Email',
    'ShippingAgentName',
    'CountryName',
    'edit',
  ];
  dataSource;
  Stores: any;

  constructor(private service: GetAllService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAllData('stores').subscribe(
      (response) => {
        this.Stores = response;
        this.dataSource = new MatTableDataSource(this.Stores);
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

  StoresForm() {
    this.Stores = new StoresDetail();
    this.router.navigate(['/manage/add/store', this.Stores]);
  }
}
