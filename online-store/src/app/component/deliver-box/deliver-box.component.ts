import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DeliverTime } from 'src/app/model/enum/DeliverTime';

@Component({
  selector: 'app-deliver-box',
  templateUrl: './deliver-box.component.html',
  styleUrls: ['./deliver-box.component.scss']
})
export class DeliverBoxComponent implements OnInit {

  @Output() deliverTimeChangeEvent = new EventEmitter<DeliverTime>();
  @Output() dateChangeEvent = new EventEmitter<Date>();
  
  deliverDate = new Array<Date>();
  deliverTime: DeliverTime;

  constructor() {
    let currentDate = new Date();
    for (let i = 0; i < 3; i++) {
      let date = new Date();
      date.setDate(currentDate.getDate() + (i + 1));
      this.deliverDate.push(date);
    }
  }

  ngOnInit(): void {
  }

  changeDeliverTime(e) {
    this.deliverTime = e.target.value;
    this.deliverTimeChangeEvent.emit(this.deliverTime);
  }

  changeDeliverDate(e) {
    this.dateChangeEvent.emit(e.target.value);
  }
}
