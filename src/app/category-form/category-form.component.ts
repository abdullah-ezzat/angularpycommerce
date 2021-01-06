import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GetDataApiService } from '../get-data-api.service';
import { CategoryDetail } from './category.model';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  category: any;
  Categories: any;
  cat: any;
  constructor(private route: Router, private service: GetDataApiService) { }
  

  ngOnInit(): void {
    this.service.getAllCategory()
    .subscribe(response => {
      this.Categories = response;

    },error => {
      alert('An unexpected error occured.');
      console.log(error);

    });
  }

  saveCategory(post : CategoryDetail){
  
    ;

    this.service.addNewCategory(post)
    .pipe().subscribe(response => {
     
      
    },error => {
      alert('An unexpected error occured.');
      console.log(error);
    });
      this.route.navigate(['/category-table'])
  }
}
