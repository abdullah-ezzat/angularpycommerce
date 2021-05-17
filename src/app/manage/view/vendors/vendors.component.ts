import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VendorDetails } from './vendors.model';
import { GetAllService } from 'src/app/api/all/get-all.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css'],
})
export class VendorsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['Id', 'NameL', 'Email', 'edit'];
  dataSource;
  Vendors: any;

  constructor(private service: GetAllService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAllData('vendors').subscribe(
      (response) => {
        this.Vendors = response;
        this.dataSource = new MatTableDataSource(this.Vendors);
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

  VendorsForm() {
    this.Vendors = new VendorDetails();
    this.router.navigate(['vendors-Form', this.Vendors]);
  }
}
