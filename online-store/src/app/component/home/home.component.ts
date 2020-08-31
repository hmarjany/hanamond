import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() productList: Product[];

  constructor() { 
    this.productList =[
    ];
  }

  ngOnInit(): void {
  }

}
