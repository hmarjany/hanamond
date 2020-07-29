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
      {Name:"test1",Price:1000,ImagePath:'assets/carousel-1bg.png'},
      {Name:"test2",Price:5000,ImagePath:'assets/carousel-1bg.png'},
      {Name:"test3",Price:1000,ImagePath:'assets/carousel-1bg.png'},
      {Name:"test4",Price:5000,ImagePath:'assets/carousel-1bg.png'},
      {Name:"test5",Price:1000,ImagePath:'assets/carousel-1bg.png'},
      {Name:"test6",Price:5000,ImagePath:'assets/carousel-1bg.png'},
      {Name:"test7",Price:1000,ImagePath:'assets/carousel-1bg.png'},
      {Name:"test8",Price:5000,ImagePath:'assets/carousel-1bg.png'},
      {Name:"test9",Price:1000,ImagePath:'assets/carousel-1bg.png'},
      {Name:"test10",Price:5000,ImagePath:'assets/carousel-1bg.png'}
    ];
  }

  ngOnInit(): void {
  }

}
