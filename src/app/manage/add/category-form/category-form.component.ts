import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryDetail } from './category.model';
declare var $: any;
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  category: any;
  Categories: any;
  filteredCategories: any;
  image: File;

  constructor(
    private route: Router,
    private all: GetAllService,
    public add: AddDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.all.getAllData('categories').subscribe(
      async (response) => {
        await this.all
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.Categories = data;
            this.filteredCategories = this.Categories.slice();
          });
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );
    function readURL(input, img) {
      if (input.value && input.value[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $(img).attr('src', e.target.result);
        };

        reader.readAsDataURL(input.value[0]);
      }
    }

    $('#Image').change(function () {
      readURL(this, '#imgsrc');
    });
  }
  onChangeImg(event: any) {
    this.image = event.target.files[0];
  }
  saveCategory(post: CategoryDetail) {
    const formData = new FormData();
    formData.append('NameL', post.NameL.toString());
    formData.append('MainCategoryId', post.MainCategoryId_id.toString());
    formData.append('ImageUrl', this.image, this.image.name);
    this.add
      .addCategory(formData)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          this.toastr.error('Error while retrieving data');
          console.log(error);
        }
      );
    this.route.navigate(['/manage/categories']);
  }

  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
