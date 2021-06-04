import { Component } from '@angular/core';
import { ShippingAgentDetails } from '../../view/shipping-agent/shipping-agent.model';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { AddDataService } from 'src/app/api/add/add-data.service';

@Component({
  selector: 'app-shipping-agents-edit',
  templateUrl: './shipping-agents-edit.component.html',
  styleUrls: ['./shipping-agents-edit.component.css'],
})
export class ShippingAgentsEditComponent {
  ShippingAgent: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private get: GetDataService,
    private update: AddDataService
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.get
        .getData('shippingAgents', id)
        .subscribe((response) => (this.ShippingAgent = response));
  }

  updateShippingAgents(post: ShippingAgentDetails) {
    this.update
      .updateData('shippingAgents', post.id, post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );
    this.router.navigate(['/manage/shippingagents']);
  }
}
