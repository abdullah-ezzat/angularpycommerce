import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { ProductSpecificationDetails } from './product-specification.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-specification',
  templateUrl: './product-specification.component.html',
  styleUrls: ['./product-specification.component.css'],
})
export class ProductSpecificationComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = [
    'Id',
    'ProductId',
    'SpecificationName',
    'SpecificationValue',
    'edit',
  ];
  dataSource;
  specification: any;
  ProductId: any;

  constructor(private all: GetAllService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.all.getProSpec(this.ProductId).subscribe(
      (response) => {
        this.specification = response;

        this.dataSource = new MatTableDataSource(this.specification);

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
    {
    }
  }

  addSpecification() {
    this.specification = new ProductSpecificationDetails();
    location.assign('/manage/add/specification' + this.specification);
  }
}
