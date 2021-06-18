import { Component, OnInit } from '@angular/core';

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

  constructor(public service: GetAllService, public route: Router) {}

  ngOnInit(): void {
    localStorage.removeItem('selectedIds');
    let CartId = localStorage.getItem('CategoryId');
    localStorage.removeItem('CategoryId');
    this.CategoryId = Number(CartId);

    this.getProducts(1, this.CategoryId, null);

    this.searchTerm.valueChanges.subscribe((search) => {
      this.service.getProductNames(search).subscribe((data) => {
        this.ProductsString = data as any[];
      });
    });
  }

  getProductAfterTerm() {
    this.search = this.searchTerm.value;
    if (this.search == '') {
      this.search = 'null';
    }
    this.getProducts(1, this.CategoryId, this.search);
  }

  clearSearch() {
    this.value = '';
    this.getProducts(1, null, null);
  }

  getProducts(page, CategoryId = 0, searchTerms) {
    this.service.getAllSpecifications(this.CategoryId).subscribe(
      (response: any) => {
        this.AllSpecifications = response;
        const arrayUniqueByKey = [
          ...new Map(
            this.AllSpecifications.map((item) => [item['id'], item])
          ).values(),
        ];

        this.AllSpecifications = arrayUniqueByKey;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.service.getAllData('specificationValueCount').subscribe(
      (response) => {
        this.AllProductSpecifications = response;
        this.AllProductSpecifications = this.AllProductSpecifications.filter(
          (v, i, a) =>
            a.findIndex(
              (t) => t.SpecificationValue === v.SpecificationValue
            ) === i
        );
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.CategoryId = CategoryId;
    this.service.getMaxPage(null, searchTerms, CategoryId).subscribe(
      (response) => {
        this.MaxPageNumber = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
    this.service.getHomeProducts(page, null, searchTerms, CategoryId).subscribe(
      (response) => {
        this.HomeDetails = response;
        document.getElementById('page 1').className = 'page-item active';
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
  }
  getHomeProducts(page, searchTerms, selectedIds) {
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
    this.service
      .getHomeProducts(page, selectedIds, searchTerms, this.CategoryId)
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
    this.service.getMaxPage(selectedIds, null, this.CategoryId).subscribe(
      (response) => {
        this.MaxPageNumber = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
    this.getHomeProducts(this.page, null, selectedIds);
  }
  scrollTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  assign(url) {
    location.assign(url);
  }
}
