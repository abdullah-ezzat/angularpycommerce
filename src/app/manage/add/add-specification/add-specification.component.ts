import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { SpecificationDetails } from '../../view/view-specifications/specifications.model';

@Component({
  selector: 'app-add-specification',
  templateUrl: './add-specification.component.html',
  styleUrls: ['./add-specification.component.css'],
})
export class AddSpecificationComponent {
  constructor(
    private add: AddDataService,
    private toastr: ToastrService,
    private route: Router
  ) {}

  addSpecification(post: SpecificationDetails) {
    this.add
      .addData('specifications', post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          this.toastr.error('Error while retrieving data');
          console.log(error);
        }
      );
    this.route.navigate(['/manage/specifications']);
  }

  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
