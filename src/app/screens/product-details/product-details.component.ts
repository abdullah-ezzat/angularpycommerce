import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartDetails } from '../shopping-cart/cart.model';
import { ToastrService } from 'ngx-toastr';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductImageComponent } from 'src/app/views/product-image/product-image.component';

declare var $: any;
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  CartDetail: any;

  currentRate: number = 0;
  Reviews: any;
  allTotalRating: any;
  allReviewsCount: any;
  OutOfFive: any;
  averageRating: any;

  StarPercentage: any;
  FiveStarsPercent: any;
  FourStarsPercent: any;
  ThreeStarsPercent: any;
  TwoStarsPercent: any;
  OneStarPercent: any;

  TotalFiveStars: any = 0;
  TotalFourStars: any = 0;
  TotalThreeStars: any = 0;
  TotalTwoStars: any = 0;
  TotalOneStar: any = 0;

  Products: any;
  CartId: any;
  Rating: any;

  ProductId: any;
  StoreId: any;
  Specifications: any;

  ImageUrl: any;

  constructor(
    private all: GetAllService,
    private get: GetDataService,
    private add: AddDataService,
    private route: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    let id = this.router.snapshot.paramMap.get('Id');
    this.ProductId = id;
    if (id)
      this.get
        .getCartItem(id)
        .subscribe((response) => (this.CartDetail = response));
  }
  ngOnInit(): void {
    this.all.getProSpecInv(this.ProductId).subscribe(
      (response) => {
        this.Specifications = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
    this.all
      .getAllReviews(this.ProductId)
      .pipe()
      .subscribe(
        (response) => {
          this.Reviews = response;
        },
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );
    this.CartDetail = CartDetails;
    this.get.getProductRating(this.ProductId).subscribe((response) => {
      this.StarPercentage = response;

      this.FiveStarsPercent = this.StarPercentage.FiveStarsPercent;
      this.FourStarsPercent = this.StarPercentage.FourStarsPercent;
      this.ThreeStarsPercent = this.StarPercentage.ThreeStarsPercent;
      this.TwoStarsPercent = this.StarPercentage.TwoStarsPercent;
      this.OneStarPercent = this.StarPercentage.OneStarPercent;

      this.TotalFiveStars = this.StarPercentage.FiveStarsCount;
      this.TotalFourStars = this.StarPercentage.FourStarsCount;
      this.TotalThreeStars = this.StarPercentage.ThreeStarsCount;
      this.TotalTwoStars = this.StarPercentage.TwoStarsCount;
      this.TotalOneStar = this.StarPercentage.OneStarCount;

      this.OutOfFive = this.StarPercentage.OutOfFive;
      this.averageRating = this.StarPercentage.averageRating;
      this.allReviewsCount = this.StarPercentage.allReviewsCount;
    });

    document.getElementById('img1').classList.add('list-active');
    $('.add-to-cart').on('click', function () {
      var cart = $('.shopping-cart');
      var imgtodrag = $('.product_img');
      if (imgtodrag) {
        var imgclone = imgtodrag
          .clone()
          .offset({
            top: imgtodrag.offset().top,
            left: imgtodrag.offset().left,
          })
          .css({
            opacity: '0.8',
            position: 'absolute',
            height: '150px',
            width: '150px',
            'z-index': '100',
          })
          .appendTo($('body'))
          .animate(
            {
              top: cart.offset().top + 10,
              left: cart.offset().left + 10,
              width: 75,
              height: 75,
            },
            1000,
            'easeInOutExpo'
          );

        setTimeout(function () {
          cart.effect(
            'shake',
            {
              times: 2,
            },
            200
          );
        }, 1500);

        imgclone.animate(
          {
            width: 0,
            height: 0,
          },
          function () {
            $(this).detach();
          }
        );
      }
    });
  }

  addNewCart() {
    var post = {
      ProductId: this.CartDetail.ProductId,
      StoreId: this.CartDetail.StoreId,
      Quantity: 1,
      MasterId: null,
    };

    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      this.add.addShoppingCartMaster().then(
        (response) => {
          this.CartId = Number(response);
          localStorage.setItem('cartId', this.CartId);
          post.MasterId = this.CartId;
          this.createNewShoppingCartItem(post);
        },
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    } else {
      this.CartId = cartId;
      post.MasterId = this.CartId;
      var LoginDateStamp = this.add.updateTimestamp();
      localStorage.setItem('LastActiveTime', JSON.stringify(LoginDateStamp));
      console.log(post);
      this.createNewShoppingCartItem(post);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }

  createNewShoppingCartItem(Post) {
    this.add
      .addCartItem(Post)
      .pipe()
      .subscribe(
        () => {
          this.route.navigate(['cart']);
        },
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );
  }

  changeRateProduct(currentRate, productReview) {
    if (currentRate > 0) {
      let userId = localStorage.getItem('UserId');
      this.Rating = {
        ProductId: this.CartDetail.ProductId,
        StoreId: this.CartDetail.StoreId,
        UserId: userId,
        Rating: currentRate,
        Review: productReview,
      };
      if (userId) {
        this.add
          .rateProduct(this.Rating)
          .pipe()
          .subscribe(
            () => {
              productReview = this.CartDetail.productReview;
              this.ImageUrl = this.CartDetail.Image;
            },
            (error) => {
              alert('An unexpected error occured.');
              console.log(error);
            }
          );
      } else {
        this.route.navigate(['/login']);
        this.toastr.error('You must login first.', '', {
          timeOut: 2000,
          positionClass: 'toast-top-center',
        });
      }
    }
  }

  Reload() {
    location.reload();
  }

  changeImage(img) {
    document.getElementById('img1').classList.remove('list-active');
    document.getElementById('img2').classList.remove('list-active');
    document.getElementById('img3').classList.remove('list-active');
    document.getElementById('img4').classList.remove('list-active');

    document.getElementById(img).classList.add('list-active');
    var value = document.getElementById(img).getAttribute('src');
    document.getElementById('product_img').setAttribute('src', value);
  }

  assign(url) {
    location.assign(url);
  }
  openDialog() {
    var img = this.CartDetail.Image;
    var img2 = this.CartDetail.Image2;
    var img3 = this.CartDetail.Image3;
    var img4 = this.CartDetail.Image4;
    this.dialog.open(ProductImageComponent, {
      width: '100%',
      height: '90%',
      panelClass: 'img-class',
      data: {
        img: img,
        img2: img2,
        img3: img3,
        img4: img4,
      },
    });
  }
}
