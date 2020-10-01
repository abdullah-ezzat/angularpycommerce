import { Component, OnInit } from '@angular/core';
import { GetDataApiService } from '../get-data-api.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FilterProduct } from './filterProduct.model';
import { stringify } from '@angular/compiler/src/util';
import { JsonPipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  page = 1;
  HomeDetails: any;
  MaxPageNumber : any;
  CategoryId: number = 0;
  AllSpecifications : any;
  AllProductSpecifications : any;

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  ProductString = <any>[];
  TheProduct : string = '';
  ProductsString : Array<any>;

  list: Array<FilterProduct> = [];
  searchTerm : FormControl = new FormControl();

  constructor(public service: GetDataApiService, public route: Router) {
  }


  // private _filter(value: string): string[] {

   

  //     const filterValue = value.toLowerCase();
  //     return this.ProductsString.filter(option => option.toLowerCase().includes(filterValue));
  // }


  ngOnInit(): void {

   


    // this.filteredOptions = this.myControl.valueChanges
    // .pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );



    localStorage.removeItem('selectedIds');
    let CatId = localStorage.getItem('CategoryId');
    localStorage.removeItem('CategoryId');
    this.CategoryId = Number(CatId) ;

    this.getProducts(CatId,null);

    this.searchTerm.valueChanges.subscribe(
      term => {
       
          this.service.getProductNames(term).subscribe(
            data => {
              this.ProductsString = data as any[];
              //console.log(data[0].BookName);

            //  this.getProducts(CatId,term)
          })
        
    });

  }
  getProductAfterTerm(){

    console.log(this.searchTerm.value);
    this.getProducts(null,this.searchTerm.value)
  }
  // mapProduct(ProductString,value: string): string[]{


  //   for (let i = 0; i < Object.keys(ProductString).length ; i++) {


  //      this.list.push(ProductString[i].NameL)

  //      this.TheProduct = this.TheProduct + "'"  + ProductString[i].NameL  + "'" + ","
  //      this.ProductsString.push(this.TheProduct);

  //   }
  //   this.TheProduct =  this.TheProduct ;
  //   this.TheProduct.split("'")

  //  //this.ProductsString = [this.TheProduct];
  //  console.log(this.ProductsString);
  //  const filterValue = value.toLowerCase();
  //  return ;
  // }
  getProductNames(ProductName){
    console.log(ProductName);

  }
  getProducts(CategoryId,searchTerms){

    this.service.getAllSpecifications(this.CategoryId)
    .subscribe(response => {
    this.AllSpecifications = response;
    console.log( this.AllSpecifications);

    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });


    this.service.getAllProductSpecification()
    .subscribe(response => {
    this.AllProductSpecifications = response;
    console.log( this.AllProductSpecifications);

    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });


    this.CategoryId = CategoryId;

    this.service.getMaxPageNumber(null,searchTerms,this.CategoryId)
    .subscribe(response => {

      this.MaxPageNumber = response;

       console.log( this.MaxPageNumber);
    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });
    this.service.getHomeProducts(null,searchTerms,this.CategoryId)
    .subscribe(response => {
      this.HomeDetails = response;

       console.log( this.HomeDetails);

    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });

  }
  onChangeSelection(specificationId,isSelected){
    console.log(specificationId);
    console.log(isSelected);
    let selectedIds;
    if(isSelected == true){

      selectedIds = localStorage.getItem('selectedIds');
      if(selectedIds == null){
        selectedIds = ''
      }
      selectedIds = selectedIds + ',' + specificationId + ','
      localStorage.setItem('selectedIds',selectedIds);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    if(isSelected == false)
    {
      selectedIds = localStorage.getItem('selectedIds');
      selectedIds = selectedIds.replace( ','+specificationId+',', "");
      localStorage.setItem('selectedIds',selectedIds);
    }

    this.service.getHomeProducts(selectedIds,"",this.CategoryId)
    .subscribe(response => {
      this.HomeDetails = response;

       console.log( this.HomeDetails);

    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });


    this.service.getMaxPageNumber(selectedIds,"",this.CategoryId)
    .subscribe(response => {

      this.MaxPageNumber = response;

       console.log( this.MaxPageNumber);
    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });


    
  }
}

