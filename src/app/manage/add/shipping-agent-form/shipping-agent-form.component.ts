import { Component } from '@angular/core';
import { ShippingAgentDetails } from '../../view/shipping-agent/shipping-agent.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AddDataService } from 'src/app/api/add/add-data.service';

@Component({
  selector: 'app-shipping-agent-form',
  templateUrl: './shipping-agent-form.component.html',
  styleUrls: ['./shipping-agent-form.component.css'],
})
export class ShippingAgentFormComponent {
  constructor(
    private route: Router,
    private add: AddDataService,
    private toastr: ToastrService
  ) {}

  createAgent(post: ShippingAgentDetails) {
    this.add
      .addData('shippingAgents', post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          this.toastr.error('Error while retrieving data');
          console.log(error);
        }
      );

    this.route.navigate(['/manage/shippingagents']);
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
