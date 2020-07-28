import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productList: Product[];
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
