import { Component, OnInit } from '@angular/core';
import { ShippingAgentDetails } from '../shipping-agent/shipping-agent.model';
import { GetDataApiService } from '../get-data-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-agent-form',
  templateUrl: './shipping-agent-form.component.html',
  styleUrls: ['./shipping-agent-form.component.css']
})
export class ShippingAgentFormComponent implements OnInit {

constructor(private route: Router, private service: GetDataApiService) { }

ngOnInit(): void {
}

createAgent(post : ShippingAgentDetails){

  ;
  this.service.addNewShippingAgent(post)
  .pipe().subscribe(response => {
  },error => {
    alert('An unexpected error occured.');
    console.log(error);
  });

  this.route.navigate(['/shippingAgent'])
}
}
