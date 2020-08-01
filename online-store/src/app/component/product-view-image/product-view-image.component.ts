import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-view-image',
  templateUrl: './product-view-image.component.html',
  styleUrls: ['./product-view-image.component.scss']
})
export class ProductViewImageComponent implements OnInit {

  constructor() { }

  myThumbnail="https://wittlock.github.io/ngx-image-zoom/assets/thumb.jpg";
  myFullresImage="https://wittlock.github.io/ngx-image-zoom/assets/fullres.jpg";
  
  ngOnInit(): void {
  }

}
