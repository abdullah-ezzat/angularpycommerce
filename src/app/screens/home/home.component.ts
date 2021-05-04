import { Component, OnInit } from '@angular/core';
import { GetDataApiService } from '../../get-data-api.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FilterProduct } from './filterProduct.model';

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

  constructor(public service: GetDataApiService, public route: Router) {}

  ngOnInit(): void {
    localStorage.removeItem('selectedIds');
    let CartId = localStorage.getItem('CategoryId');
    localStorage.removeItem('CategoryId');
    this.CategoryId = Number(CartId);

    this.getProducts(CartId, null);

    this.searchTerm.valueChanges.subscribe((term) => {
      this.service.getProductNames(term).subscribe((data) => {
        this.ProductsString = data as any[];
      });
    });
  }

  getProductAfterTerm() {
    this.getProducts(null, this.searchTerm.value);
  }

  getProducts(CategoryId, searchTerms) {
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

    this.service.getMaxPageNumber().subscribe(
      (response) => {
        this.MaxPageNumber = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
    this.service.GetHomeProducts().subscribe(
      (response) => {
        this.HomeDetails = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
    this.service.getHomeProducts(null, searchTerms, this.CategoryId).subscribe(
      (response) => {},
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
  }
  onChangeSelection(specificationId, isSelected) {
    let selectedIds;
    if (isSelected == true) {
      selectedIds = localStorage.getItem('selectedIds');
      if (selectedIds == null) {
        selectedIds = '';
      }
      selectedIds = selectedIds + ',' + specificationId + ',';
      localStorage.setItem('selectedIds', selectedIds);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    if (isSelected == false) {
      selectedIds = localStorage.getItem('selectedIds');
      selectedIds = selectedIds.replace(',' + specificationId + ',', '');
      localStorage.setItem('selectedIds', selectedIds);
    }

    this.service.getHomeProducts(selectedIds, '', this.CategoryId).subscribe(
      (response) => {
        this.HomeDetails = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.service.getMaxPageNumber().subscribe(
      (response) => {
        this.MaxPageNumber = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
  }
  scrollTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
}
