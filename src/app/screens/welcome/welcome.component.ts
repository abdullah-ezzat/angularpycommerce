import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { ToastrService } from 'ngx-toastr';
import { particlesJS } from 'tsparticles';
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
    public route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.all.getAllCategories().subscribe(
      async (response) => {
        await this.all
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.Categories = data;
          });
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );
    particlesJS.load('particles-js', 'assets/particles.json', function () {});
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
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );
  }
}
