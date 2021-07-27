import { Component, OnInit } from '@angular/core';
import { ShippingAgentDetails } from '../../view/shipping-agent/shipping-agent.model';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-shipping-agents-edit',
  templateUrl: './shipping-agents-edit.component.html',
  styleUrls: ['./shipping-agents-edit.component.css'],
})
export class ShippingAgentsEditComponent implements OnInit {
  ShippingAgent: any;

  constructor(
    private route: ActivatedRoute,
    private get: GetDataService,
    private update: AddDataService,
    private toastr: ToastrService
  ) {
    let id = this.route.snapshot.paramMap.get('Id');
    if (id)
      this.get.getData('shippingAgents', id).subscribe(async (response) => {
        await this.get
          .decryptData(response['token'], response['key'])
          .then((data) => {
            this.ShippingAgent = data;
          });
      });
  }
  ngOnInit() {
    this.ShippingAgent = ShippingAgentDetails;
  }
  updateShippingAgents(post: ShippingAgentDetails) {
    post.id = this.ShippingAgent.id;
    this.update
      .updateData('shippingAgents', post.id, post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          this.toastr.error('Error while retrieving data');
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
