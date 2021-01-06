import { Component, OnInit } from '@angular/core';
import { GetDataApiService } from '../get-data-api.service';
import { Router } from '@angular/router';
import Swiper from 'swiper/bundle';

@Component({
  selector: 'app-promotion-page',
  templateUrl: './promotion-page.component.html',
  styleUrls: ['./promotion-page.component.css'],
})
export class PromotionPageComponent implements OnInit {
  Categories: any;
  HomeProducts: any;
  Category1: any;
  Category2: any;
  Category3: any;
  Picture1Category1ImageUrl: any;
  Picture2Category1ImageUrl: any;
  Picture3Category1ImageUrl: any;
  Picture4Category1ImageUrl: any;
  Picture5Category1ImageUrl: any;
  Picture6Category1ImageUrl: any;
  Picture7Category1ImageUrl: any;
  Picture8Category1ImageUrl: any;
  Picture9Category1ImageUrl: any;
  Picture10Category1ImageUrl: any;

  Picture1Category2ImageUrl: any;
  Picture2Category2ImageUrl: any;
  Picture3Category2ImageUrl: any;
  Picture4Category2ImageUrl: any;
  Picture5Category2ImageUrl: any;
  Picture6Category2ImageUrl: any;
  Picture7Category2ImageUrl: any;
  Picture8Category2ImageUrl: any;
  Picture9Category2ImageUrl: any;
  Picture10Category2ImageUrl: any;

  Picture1Category3ImageUrl: any;
  Picture2Category3ImageUrl: any;
  Picture3Category3ImageUrl: any;
  Picture4Category3ImageUrl: any;
  Picture5Category3ImageUrl: any;
  Picture6Category3ImageUrl: any;
  Picture7Category3ImageUrl: any;
  Picture8Category3ImageUrl: any;
  Picture9Category3ImageUrl: any;
  Picture10Category3ImageUrl: any;

  Picture1Category1ImageUrlId: any;
  Picture2Category1ImageUrlId: any;
  Picture3Category1ImageUrlId: any;
  Picture4Category1ImageUrlId: any;
  Picture5Category1ImageUrlId: any;
  Picture6Category1ImageUrlId: any;
  Picture7Category1ImageUrlId: any;
  Picture8Category1ImageUrlId: any;
  Picture9Category1ImageUrlId: any;
  Picture10Category1ImageUrlId: any;

  Picture1Category2ImageUrlId: any;
  Picture2Category2ImageUrlId: any;
  Picture3Category2ImageUrlId: any;
  Picture4Category2ImageUrlId: any;
  Picture5Category2ImageUrlId: any;
  Picture6Category2ImageUrlId: any;
  Picture7Category2ImageUrlId: any;
  Picture8Category2ImageUrlId: any;
  Picture9Category2ImageUrlId: any;
  Picture10Category2ImageUrlId: any;

  Picture1Category3ImageUrlId: any;
  Picture2Category3ImageUrlId: any;
  Picture3Category3ImageUrlId: any;
  Picture4Category3ImageUrlId: any;
  Picture5Category3ImageUrlId: any;
  Picture6Category3ImageUrlId: any;
  Picture7Category3ImageUrlId: any;
  Picture8Category3ImageUrlId: any;
  Picture9Category3ImageUrlId: any;
  Picture10Category3ImageUrlId: any;

  HomeDetails: any;

  constructor(public service: GetDataApiService, public route: Router) {}

  ngOnInit(): void {
    const swiper1 = new Swiper('.s1', {
      slidesPerView: 5,
      slidesPerGroup: 1,
      mousewheel: true,
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      preloadImages: true,
      updateOnImagesReady: true,
    });

    const swiper2 = new Swiper('.s2', {
      slidesPerView: 5,
      mousewheel: true,
      slidesPerGroup: 1,
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      preloadImages: true,
      updateOnImagesReady: true,
    });

    const swiper3 = new Swiper('.s3', {
      slidesPerView: 5,
      mousewheel: true,
      slidesPerGroup: 1,
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      preloadImages: true,
      updateOnImagesReady: true,
    });

    this.service.getWelcomePageCategory().subscribe(
      (response) => {
        this.Categories = response;
        this.Category1 = this.Categories.Category1;
        this.Category2 = this.Categories.Category2;
        this.Category3 = this.Categories.Category3;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.service.getWelcomePageProducts().subscribe(
      (response) => {
        this.HomeProducts = response;

        this.Picture1Category1ImageUrl = this.HomeProducts.Picture1Category1ImageUrl;
        this.Picture2Category1ImageUrl = this.HomeProducts.Picture2Category1ImageUrl;
        this.Picture3Category1ImageUrl = this.HomeProducts.Picture3Category1ImageUrl;
        this.Picture4Category1ImageUrl = this.HomeProducts.Picture4Category1ImageUrl;
        this.Picture5Category1ImageUrl = this.HomeProducts.Picture5Category1ImageUrl;
        this.Picture6Category1ImageUrl = this.HomeProducts.Picture6Category1ImageUrl;
        this.Picture7Category1ImageUrl = this.HomeProducts.Picture7Category1ImageUrl;
        this.Picture8Category1ImageUrl = this.HomeProducts.Picture8Category1ImageUrl;
        this.Picture9Category1ImageUrl = this.HomeProducts.Picture9Category1ImageUrl;
        this.Picture10Category1ImageUrl = this.HomeProducts.Picture10Category1ImageUrl;

        this.Picture1Category2ImageUrl = this.HomeProducts.Picture1Category2ImageUrl;
        this.Picture2Category2ImageUrl = this.HomeProducts.Picture2Category2ImageUrl;
        this.Picture3Category2ImageUrl = this.HomeProducts.Picture3Category2ImageUrl;
        this.Picture4Category2ImageUrl = this.HomeProducts.Picture4Category2ImageUrl;
        this.Picture5Category2ImageUrl = this.HomeProducts.Picture5Category2ImageUrl;
        this.Picture6Category2ImageUrl = this.HomeProducts.Picture6Category2ImageUrl;
        this.Picture7Category2ImageUrl = this.HomeProducts.Picture7Category2ImageUrl;
        this.Picture8Category2ImageUrl = this.HomeProducts.Picture8Category2ImageUrl;
        this.Picture9Category2ImageUrl = this.HomeProducts.Picture9Category2ImageUrl;
        this.Picture10Category2ImageUrl = this.HomeProducts.Picture10Category2ImageUrl;

        this.Picture1Category3ImageUrl = this.HomeProducts.Picture1Category3ImageUrl;
        this.Picture2Category3ImageUrl = this.HomeProducts.Picture2Category3ImageUrl;
        this.Picture3Category3ImageUrl = this.HomeProducts.Picture3Category3ImageUrl;
        this.Picture4Category3ImageUrl = this.HomeProducts.Picture4Category3ImageUrl;
        this.Picture5Category3ImageUrl = this.HomeProducts.Picture5Category3ImageUrl;
        this.Picture6Category3ImageUrl = this.HomeProducts.Picture6Category3ImageUrl;
        this.Picture7Category3ImageUrl = this.HomeProducts.Picture7Category3ImageUrl;
        this.Picture8Category3ImageUrl = this.HomeProducts.Picture8Category3ImageUrl;
        this.Picture9Category3ImageUrl = this.HomeProducts.Picture9Category3ImageUrl;
        this.Picture10Category3ImageUrl = this.HomeProducts.Picture10Category3ImageUrl;

        this.Picture1Category1ImageUrlId = this.HomeProducts.Picture1Category1ImageUrlId;
        this.Picture2Category1ImageUrlId = this.HomeProducts.Picture2Category1ImageUrlId;
        this.Picture3Category1ImageUrlId = this.HomeProducts.Picture3Category1ImageUrlId;
        this.Picture4Category1ImageUrlId = this.HomeProducts.Picture4Category1ImageUrlId;
        this.Picture5Category1ImageUrlId = this.HomeProducts.Picture5Category1ImageUrlId;
        this.Picture6Category1ImageUrlId = this.HomeProducts.Picture6Category1ImageUrlId;
        this.Picture7Category1ImageUrlId = this.HomeProducts.Picture7Category1ImageUrlId;
        this.Picture8Category1ImageUrlId = this.HomeProducts.Picture8Category1ImageUrlId;
        this.Picture9Category1ImageUrlId = this.HomeProducts.Picture9Category1ImageUrlId;
        this.Picture10Category1ImageUrlId = this.HomeProducts.Picture10Category1ImageUrlId;

        this.Picture1Category2ImageUrlId = this.HomeProducts.Picture1Category2ImageUrlId;
        this.Picture2Category2ImageUrlId = this.HomeProducts.Picture2Category2ImageUrlId;
        this.Picture3Category2ImageUrlId = this.HomeProducts.Picture3Category2ImageUrlId;
        this.Picture4Category2ImageUrlId = this.HomeProducts.Picture4Category2ImageUrlId;
        this.Picture5Category2ImageUrlId = this.HomeProducts.Picture5Category2ImageUrlId;
        this.Picture6Category2ImageUrlId = this.HomeProducts.Picture6Category2ImageUrlId;
        this.Picture7Category2ImageUrlId = this.HomeProducts.Picture7Category2ImageUrlId;
        this.Picture8Category2ImageUrlId = this.HomeProducts.Picture8Category2ImageUrlId;
        this.Picture9Category2ImageUrlId = this.HomeProducts.Picture9Category2ImageUrlId;
        this.Picture10Category2ImageUrlId = this.HomeProducts.Picture10Category2ImageUrlId;

        this.Picture1Category3ImageUrlId = this.HomeProducts.Picture1Category3ImageUrlId;
        this.Picture2Category3ImageUrlId = this.HomeProducts.Picture2Category3ImageUrlId;
        this.Picture3Category3ImageUrlId = this.HomeProducts.Picture3Category3ImageUrlId;
        this.Picture4Category3ImageUrlId = this.HomeProducts.Picture4Category3ImageUrlId;
        this.Picture5Category3ImageUrlId = this.HomeProducts.Picture5Category3ImageUrlId;
        this.Picture6Category3ImageUrlId = this.HomeProducts.Picture6Category3ImageUrlId;
        this.Picture7Category3ImageUrlId = this.HomeProducts.Picture7Category3ImageUrlId;
        this.Picture8Category3ImageUrlId = this.HomeProducts.Picture8Category3ImageUrlId;
        this.Picture9Category3ImageUrlId = this.HomeProducts.Picture9Category3ImageUrlId;
        this.Picture10Category3ImageUrlId = this.HomeProducts.Picture10Category3ImageUrlId;

      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.service.getHomeProducts(null, null, 0).subscribe(
      (response) => {
        this.HomeDetails = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
  }
}
