import { Component, OnInit } from '@angular/core';
import { ShippingAgentDetails } from '../../view/shipping-agent/shipping-agent.model';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataApiService } from '../../../get-data-api.service';

@Component({
  selector: 'app-shipping-agents-edit',
  templateUrl: './shipping-agents-edit.component.html',
  styleUrls: ['./shipping-agents-edit.component.css']
})
export class ShippingAgentsEditComponent implements OnInit {

  ShippingAgent: any;

  constructor(private router: Router, private service: GetDataApiService, private route: ActivatedRoute) { 

    let id = this.route.snapshot.paramMap.get('Id');
    if (id) this.service.getShippingAgent(id).subscribe(response => this.ShippingAgent = response);
  }

  ngOnInit(): void {

  }

  updateShippingAgents(post: ShippingAgentDetails){
 
  ;

  this.service.updateShippingAgents(post)
  .pipe().subscribe(response => {
   
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });
  this.router.navigate(['/shippingAgent'])
}

}

