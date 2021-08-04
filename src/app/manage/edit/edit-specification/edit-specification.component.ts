import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { SpecificationDetails } from '../../view/view-specifications/specifications.model';

@Component({
  selector: 'app-edit-specification',
  templateUrl: './edit-specification.component.html',
  styleUrls: ['./edit-specification.component.css'],
})
export class EditSpecificationComponent implements OnInit {
  ProductId: any;
  specification: any;
  Specifications: any;
  constructor(
    private route: ActivatedRoute,
    private get: GetDataService,
    private all: GetAllService,
    private update: AddDataService,
    private toastr: ToastrService
  ) {
    let id = this.route.snapshot.paramMap.get('Id');
    this.ProductId = id;
    if (id)
      this.get.getData('specifications', id).subscribe(async (response) => {
        await this.get
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.specification = data;
          });
      });
  }
  ngOnInit() {
    this.all.getAllData('specifications').subscribe(
      async (response) => {
        await this.get
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.Specifications = data;
          });
      },
      (error) => {
        this.toastr.error('Error while retrieving data');
        console.log(error);
      }
    );
  }
  updateSpecification(post: SpecificationDetails) {
    post.id = this.specification.id;
    this.update
      .updateData('specifications', post.id, post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          this.toastr.error('Error while retrieving data');
          console.log(error);
        }
      );
    location.assign('/manage/specifications/');
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
