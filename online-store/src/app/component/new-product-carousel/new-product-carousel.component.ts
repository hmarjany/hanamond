import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-new-product-carousel',
  templateUrl: './new-product-carousel.component.html',
  styleUrls: ['./new-product-carousel.component.scss']
})
export class NewProductCarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  customOptions: OwlOptions = {
    autoWidth: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    center: true,
    autoHeight: true,
    autoplay: true,
    navSpeed: 700,
    rtl: true,
    dots: false,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
}
