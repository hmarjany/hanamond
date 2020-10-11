import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class OrderTrackingComponent implements OnInit, AfterViewInit {

  @ViewChild('stepper') 
  private stepper: MatStepper;
  
  constructor() { }
  ngAfterViewInit(): void {
    // need loop to all step get color
    this.stepper.selectedIndex = 0;
    
  }

  ngOnInit(): void {
    
  }

}
