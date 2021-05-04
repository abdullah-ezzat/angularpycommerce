import { Component, OnInit } from '@angular/core';
import { GetDataApiService } from '../../get-data-api.service';
import { Router } from '@angular/router';
import Swiper from 'swiper/bundle';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  Categories: any;

  constructor(public service: GetDataApiService, public route: Router) {}

  ngOnInit(): void {
    this.service.getAllCategory().subscribe(
      (response) => {
        this.Categories = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
  }
}
