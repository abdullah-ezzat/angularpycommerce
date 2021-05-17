import { Component, OnInit } from '@angular/core';
import { GetDataApiService } from '../../get-data-api.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FilterProduct } from './filterProduct.model';
import { GetAllService } from 'src/app/api/all/get-all.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  page = 1;
  HomeDetails: any;
  MaxPageNumber: any;
  CategoryId: number = 0;
  AllSpecifications: any;
  AllProductSpecifications: any;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  ProductString = <any>[];
  TheProduct: string = '';
  ProductsString: Array<any>;

  list: Array<FilterProduct> = [];
  searchTerm: FormControl = new FormControl();
  value = '';
  search = '';
  has_prev = false;
  has_next = true;

  constructor(
    public service: GetDataApiService,
    public services: GetAllService,
    public route: Router
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('selectedIds');
    let CartId = localStorage.getItem('CategoryId');
    localStorage.removeItem('CategoryId');
    this.CategoryId = Number(CartId);

    this.getProducts(1, CartId, null);

    this.searchTerm.valueChanges.subscribe((search) => {
      this.services.getProductNames(search).subscribe((data) => {
        this.ProductsString = data as any[];
      });
    });
  }

  getProductAfterTerm() {
    this.search = this.searchTerm.value;
    if (this.search == '') {
      this.search = 'null';
    }
    this.getProducts(1, null, this.search);
  }

  clearSearch() {
    this.value = '';
    this.getProducts(1, null, null);
  }

  getProducts(page, CategoryId, searchTerms) {
    this.service.getAllSpecifications(this.CategoryId).subscribe(
      (response) => {
        this.AllSpecifications = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.service.getAllProductSpecification().subscribe(
      (response) => {
        this.AllProductSpecifications = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.CategoryId = CategoryId;
    this.services.getMaxPage(null, searchTerms, (CategoryId = 0)).subscribe(
      (response) => {
        this.MaxPageNumber = response;
        console.log(this.MaxPageNumber);
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
    this.services
      .getHomeProducts(page, null, searchTerms, (CategoryId = 0))
      .subscribe(
        (response) => {
          this.HomeDetails = response;
        },
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );
  }
  getHomeProducts(page, searchTerms, selectedIds, CategoryId = 0) {
    if (page == 'previous') {
      page = this.page - 1;
      this.page = page;
    }
    if (page == 'next') {
      page = this.page + 1;
      this.page = page;
    }
    if (page > 1) {
      this.has_prev = true;
    } else {
      this.has_prev = false;
    }
    var MaxPageNumber: [] = this.MaxPageNumber;
    var last_page = MaxPageNumber[MaxPageNumber.length - 1];
    if (page == 'last') {
      page = last_page;
      this.page = page;
      if (page > 1) {
        this.has_prev = true;
      }
    }
    if (page == last_page) {
      this.has_next = false;
    } else {
      this.has_next = true;
    }
    for (var p of this.MaxPageNumber) {
      let pages = document.getElementById('page ' + p);
      pages.className = 'page-item';
    }

    let pages = document.getElementById('page ' + page);
    pages.className = 'page-item active';
    this.page = page;
    this.services
      .getHomeProducts(page, selectedIds, searchTerms, CategoryId)
      .subscribe(
        (response) => {
          this.HomeDetails = response;
        },
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );
    this.scrollTop();
  }
  // onChangeSelection(specificationId, isSelected) {
  //   let selectedIds;
  //   if (isSelected == true) {
  //     selectedIds = localStorage.getItem('selectedIds');
  //     if (selectedIds == null) {
  //       selectedIds = '';
  //     }
  //     selectedIds = selectedIds + ',' + specificationId + ',';
  //     localStorage.setItem('selectedIds', selectedIds);
  //     document.body.scrollTop = document.documentElement.scrollTop = 0;
  //   }
  //   if (isSelected == false) {
  //     selectedIds = localStorage.getItem('selectedIds');
  //     selectedIds = selectedIds.replace(',' + specificationId + ',', '');
  //     localStorage.setItem('selectedIds', selectedIds);
  //   }
  onChangeSelection(specificationId, isSelected) {
    let selectedIds;
    if (isSelected == true) {
      selectedIds = localStorage.getItem('selectedIds');
      if (selectedIds == null || selectedIds == 'null') {
        selectedIds = '';
      }
      selectedIds = selectedIds + specificationId + ',';
      localStorage.setItem('selectedIds', selectedIds);
      this.scrollTop();
    }
    if (isSelected == false) {
      selectedIds = localStorage.getItem('selectedIds');
      selectedIds = selectedIds.replace(specificationId + ',', '');
      if (selectedIds == '') {
        selectedIds = 'null';
      }
      localStorage.setItem('selectedIds', selectedIds);
    }
    this.services.getMaxPage(selectedIds, null, this.CategoryId).subscribe(
      (response) => {
        this.MaxPageNumber = response;
        console.log(this.MaxPageNumber);
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
    this.getHomeProducts(this.page, null, selectedIds, this.CategoryId);
  }
  scrollTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
}
