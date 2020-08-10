import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { 
    
  }

  items = [];
  itemsCountChange: Subject<number> = new Subject<number>();

  addToCart(product) {
    this.items.push(product);
    localStorage.setItem('hanamondcartsatatus',JSON.stringify(this.items));
  }

  getItems() {
    this.items = JSON.parse(localStorage.getItem('hanamondcartsatatus'));
    return this.items;
  }

  removeFromCart(product){
    var itemIndex = this.items.indexOf(product, 0);
    if(itemIndex > -1){
      this.items.splice(itemIndex, 1);
    }
    localStorage.setItem('hanamondcartsatatus',JSON.stringify(this.items));
  }

  clearCart() {
    localStorage.setItem('hanamondcartsatatus',null);
    this.items = JSON.parse(localStorage.getItem('hanamondcartsatatus'));
    return this.items;
  }

  getItemsCount(){
    this.getItems();
    var itemlength = this.items.length;
    if(itemlength === 0){
      itemlength = undefined;
    }
    this.itemsCountChange.next(itemlength);
  }
}
