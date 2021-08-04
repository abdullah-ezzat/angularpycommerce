import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { SpecificationDetails } from './specifications.model';

@Component({
  selector: 'app-view-specifications',
  templateUrl: './view-specifications.component.html',
  styleUrls: ['./view-specifications.component.css'],
})
export class ViewSpecificationsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['id', 'NameL', 'ShowInFilter', 'edit'];
  dataSource;
  Specifications: any;
  constructor(
    private all: GetAllService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.all.getAllData('specifications').subscribe(
      async (response) => {
        await this.all
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.Specifications = data;
          });
        this.dataSource = new MatTableDataSource(this.Specifications);
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

  SpecificationsForm() {
    this.Specifications = new SpecificationDetails();
    this.router.navigate(['/manage/add/specification', this.Specifications]);
  }
}
