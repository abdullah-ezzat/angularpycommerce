import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataApiService } from '../get-data-api.service';
import { CartDetails } from '../shopping-cart/cart.model';
import { ToastrService } from 'ngx-toastr';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

declare var $: any;
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  CartDetail: any;
  HomeDetails: any;

  category: any;
  Categories: any;

  currentRate: number = 0;
  Reviews: any;
  allTotalRating: any;
  allReviewsCount: any;
  OutOfFive: any;
  averageRating: any;

  StarPercentage: any;

  FiveStarPercent: any;
  FourStarPercent: any;
  ThreeStarPercent: any;
  TwoStarPercent: any;
  OneStarPercent: any;

  TotalFiveStars: any = 0;
  TotalFourStars: any = 0;
  TotalThreeStars: any = 0;
  TotalTwoStars: any = 0;
  TotalOneStars: any = 0;

  brand: any;
  Brands: any;

  productId: any;
  Products: any;
  CartId: any;

  ProductId: any;
  StoreId: any;
  Specifications: any;

  ImageUrl: any;

  constructor(
    private service: GetDataApiService,
    private route: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    let id = this.router.snapshot.paramMap.get('Id');
    this.ProductId = id;
    if (id)
      this.service
        .getCartItemDetail(id)
        .subscribe((response) => (this.CartDetail = response));
  }

  ngOnInit(): void {
    this.service
      .getAllproductSpecificationsFromBalance(this.ProductId)
      .subscribe(
        (response) => {
          this.Specifications = response;

          console.log(this.Specifications);
        },
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );

    this.service
      .getAllReviews(this.ProductId)
      .pipe()
      .subscribe(
        (response) => {
          this.Reviews = response;
          console.log(response);
        },
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );

    this.service.getStarsPercent(this.ProductId).subscribe((response) => {
      this.StarPercentage = response;

      this.FiveStarPercent = this.StarPercentage.FiveStarsPercent;
      this.FourStarPercent = this.StarPercentage.FourStarsPercent;
      this.ThreeStarPercent = this.StarPercentage.ThreeStarsPercent;
      this.TwoStarPercent = this.StarPercentage.TwoStarsPercent;
      this.OneStarPercent = this.StarPercentage.OneStarsPercent;

      this.TotalFiveStars = this.StarPercentage.FiveStarsCount;
      this.TotalFourStars = this.StarPercentage.FourStarsCount;
      this.TotalThreeStars = this.StarPercentage.ThreeStarsCount;
      this.TotalTwoStars = this.StarPercentage.TwoStarsCount;
      this.TotalOneStars = this.StarPercentage.OneStarsCount;

      this.allTotalRating = this.StarPercentage.allTotalRating;
      this.OutOfFive = this.StarPercentage.OutOfFive;
      this.averageRating = this.StarPercentage.averageRating;
      this.allReviewsCount = this.StarPercentage.allReviewsCount;

      console.log(this.StarPercentage);
      console.log(this.OutOfFive);
    });

    $('.add-to-cart').on('click', function () {
      var cart = $('.shopping-cart');
      var imgtodrag = $(this).parent('.item').find('img').eq(0);
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

  addNewCart(post: CartDetails) {
    console.log(post);

    let cartId = localStorage.getItem('cartId');

    if (!cartId) {
      this.service.addNewShoppingCartMaster().then(
        (response) => {
          console.log(response);
          this.CartId = Number(response);
          localStorage.setItem('cartId', this.CartId);
          post.MasterId = this.CartId;
          var LoginDateStamp = this.service.updateLastActiveTime();
          localStorage.setItem(
            'LastActiveTime',
            JSON.stringify(LoginDateStamp)
          );
          this.createNewShoppingCartItem(post);
        },
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );
    } else {
      this.CartId = cartId;
      post.MasterId = this.CartId;
      var LoginDateStamp = this.service.updateLastActiveTime();
      localStorage.setItem('LastActiveTime', JSON.stringify(LoginDateStamp));
      this.createNewShoppingCartItem(post);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }

  createNewShoppingCartItem(Post) {
    this.service
      .addNewShoppingCartItem(Post)
      .pipe()
      .subscribe(
        (response) => {
          console.log(response);
          this.route.navigate(['shopping-Cart']);
        },
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );
  }

  changeRateProduct(currentRate, productReview) {
    if (currentRate > 0) {
      console.log(currentRate);
      let userId = localStorage.getItem('UserId');

      if (userId) {
        this.service
          .rateTheProduct(
            this.CartDetail.ProductId,
            this.CartDetail.StoreId,
            userId,
            currentRate,
            this.CartDetail.productReview
          )
          .pipe()
          .subscribe(
            (response) => {
              productReview = this.CartDetail.productReview;
              this.ImageUrl = this.CartDetail.ImageUrl7;
              console.log(response);
            },
            (error) => {
              alert('An unexpected error occured.');
              console.log(error);
            }
          );
      } else {
        this.route.navigate(['/Login']);
        this.toastr.error('You Must Login First', '', {
          timeOut: 2000,
          positionClass: 'toast-top-center',
        });
      }
    }
  }

  Reload() {
    location.reload();
  }

  openDialog() {
    this.dialog.open(ImageDialogComponent, {
      data: {
        ImageUrl: this.CartDetail.ImageUrl7,
        ImageUrl2: this.CartDetail.ImageUrl2,
        ImageUrl3: this.CartDetail.ImageUrl3,
      },
    });
  }
}
