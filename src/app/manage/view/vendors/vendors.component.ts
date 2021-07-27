import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VendorDetails } from './vendors.model';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css'],
})
export class VendorsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['id', 'NameL', 'Email', 'edit'];
  dataSource;
  Vendors: any;

  constructor(
    private all: GetAllService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.all.getAllData('vendors').subscribe(
      async (response) => {
        await this.all
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.Vendors = data;
          });
        this.dataSource = new MatTableDataSource(this.Vendors);
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

  VendorsForm() {
    this.Vendors = new VendorDetails();
    this.router.navigate(['/manage/add/vendor', this.Vendors]);
  }
}
