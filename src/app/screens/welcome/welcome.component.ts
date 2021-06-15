import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  Categories: any;
  CategoryId: any;

  constructor(
    public all: GetAllService,
    public get: GetDataService,
    public route: Router
  ) {}

  ngOnInit(): void {
    this.all.getAllCategories().subscribe(
      (response) => {
        this.Categories = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
  }
  assign(url) {
    location.assign(url);
  }
  assignCategory(CategoryId) {
    this.get.assignCategory(CategoryId).subscribe(
      (response) => {
        this.CategoryId = response;
        localStorage.setItem('CategoryId', this.CategoryId.id);
        this.assign('/Home');
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
  }
}
