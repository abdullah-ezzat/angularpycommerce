import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { GetDataApiService } from '../get-data-api.service';
import { CategoryDetail } from '../category-form/category.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  category: any;
  Categories: any;
  cat: any;

  constructor(private router: Router, private service: GetDataApiService, private route: ActivatedRoute) { 
    
    let id = this.route.snapshot.paramMap.get('Id');
    if (id) this.service.getCategory(id).subscribe(response => this.category = response);
  }


ngOnInit(): void {
  this.service.getAllCategory()
  .subscribe(response => {
    this.Categories = response;
    
     console.log( this.Categories);
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });
}

updateCategory(post : CategoryDetail){

  console.log(post);

  this.service.updateCategory(post)
  .pipe().subscribe(response => {
   
    
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });
  this.router.navigate(['/category-table']);
  

}


}
