import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-new-product-carousel',
  templateUrl: './new-product-carousel.component.html',
  styleUrls: ['./new-product-carousel.component.scss']
})
export class NewProductCarouselComponent implements OnInit {

  @Input() productList: Product[];
  
  constructor() {}

  ngOnInit(): void {
  }

}
