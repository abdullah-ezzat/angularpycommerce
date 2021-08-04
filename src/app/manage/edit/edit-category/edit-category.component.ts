import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { CategoryDetail } from '../../add/category-form/category.model';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditComponent implements OnInit {
  category: any;
  Categories: any;
  filteredCategories: any;
  image: File;

  constructor(
    private route: ActivatedRoute,
    private all: GetAllService,
    private get: GetDataService,
    private update: AddDataService,
    private toastr: ToastrService
  ) {
    let id = this.route.snapshot.paramMap.get('Id');
    if (id)
      this.get.getData('categories', id).subscribe(async (response) => {
        await this.get
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.category = data;
          });
      });
  }

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
    this.category = CategoryDetail;
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

  updateCategory(post: CategoryDetail) {
    post.id = this.category.id;
    const formData = new FormData();
    formData.append('NameL', post.NameL.toString());
    formData.append('MainCategoryId', post.MainCategoryId_id.toString());
    formData.append('ImageUrl', this.image, this.image.name);
    this.update
      .updateCategory(post.id, formData)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          this.toastr.error('Error while retrieving data');
          console.log(error);
        }
      );
    location.assign('/manage/categories');
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
