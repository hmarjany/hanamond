import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit {

  @Input()pageCount = 0;
  @Output() pageNumber = new EventEmitter<number>();
  pages:Array<number>;

  constructor() { 
    
  }

  ngOnInit(): void {
    this.pages = new Array<number>(this.pageCount); 
    for(var i = 0; i < this.pages.length; i++){
      this.pages[i]=i;
    }
  }

  active(e):void{
    var children = e.path[1].children;
    for(let i = 0; i < children.length; i++){
        children[i].className = "pageElement";
    }
    var a = e.target;
    this.pageNumber.emit(parseInt(e.target.innerText));
    a.className += " active";
  }
}
