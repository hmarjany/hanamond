import { Component, OnInit, HostListener } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  innerWidth: any;
  innerHeight: any;

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
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