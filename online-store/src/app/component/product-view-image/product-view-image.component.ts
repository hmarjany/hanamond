import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-view-image',
  templateUrl: './product-view-image.component.html',
  styleUrls: ['./product-view-image.component.scss']
})
export class ProductViewImageComponent implements OnInit {

  @Input() imagePaths: Array<String> = new Array<String>();
  selectedImage:String;
  
  constructor() { 
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.imagePaths != undefined){
      this.selectedImage = this.imagePaths[0];
    }
  }

  myThumbnail="https://wittlock.github.io/ngx-image-zoom/assets/thumb.jpg";
  myFullresImage="https://wittlock.github.io/ngx-image-zoom/assets/fullres.jpg";
  
  ngOnInit(): void {
    
  }

  changeSelectedImage(i){
    this.selectedImage = this.imagePaths[i];
  }
}
