import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { CategoryDetail } from '../../add/category-form/category.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditComponent implements OnInit {
  category: any;
  Categories: any;
  cat: any;

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
          });
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );
    this.category = CategoryDetail;
  }

  updateCategory(post: CategoryDetail) {
    post.id = this.category.id;
    this.update
      .updateData('categories', post.id, post)
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
