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
    private route: ActivatedRoute,
    private get: GetDataService,
    private update: AddDataService
  ) {
    let id = this.route.snapshot.paramMap.get('Id');
    if (id)
      this.get
        .getData('shippingAgents', id)
        .subscribe((response) => (this.ShippingAgent = response));
  }

  updateShippingAgents(post: ShippingAgentDetails) {
    post.id = this.ShippingAgent.id;
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
    location.assign('/manage/shippingagents');
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
