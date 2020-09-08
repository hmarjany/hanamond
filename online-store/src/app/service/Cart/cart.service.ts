import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/model/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
    this.items = [];
  }

  items: Array<Product> = new Array<Product>();
  itemsCountChange: Subject<number> = new Subject<number>();

  addToCart(product: Product) {
    if (this.items.find(x => x._id === product._id) != null) {
      (this.items.find(x => x._id === product._id).Count as number) += 1;
    } else {
      this.items.push(product);
    }
    localStorage.setItem('hanamondcartsatatus', JSON.stringify(this.items));
  }

  getItems() {
    this.items = JSON.parse(localStorage.getItem('hanamondcartsatatus'));
    if (this.items === null) {
      this.items = [];
    }
    return this.items;
  }

  removeFromCart(product: Product) {

    if (this.items.find(x => x._id === product._id) != null) {
      var productCount = this.items.find(x => x._id === product._id).Count;
      if (productCount > 1) {
        (this.items.find(x => x._id === product._id).Count as number) -= 1;
      }
      else {
        var itemIndex = this.items.indexOf(product, 0);
        if (itemIndex > -1) {
          this.items.splice(itemIndex, 1);
        }
      }
    } else {
      var itemIndex = this.items.indexOf(product, 0);
      if (itemIndex > -1) {
        this.items.splice(itemIndex, 1);
      }
    }
    localStorage.setItem('hanamondcartsatatus', JSON.stringify(this.items));
  }

  clearCart() {
    localStorage.setItem('hanamondcartsatatus', null);
    this.items = JSON.parse(localStorage.getItem('hanamondcartsatatus'));
    return this.items;
  }

  getItemsCount() {
    this.getItems();
    var itemlength = 0;
    if (this.items != null) {
      itemlength = this.items.length;
    }

    if (itemlength === 0) {
      itemlength = undefined;
    }

    this.itemsCountChange.next(itemlength);
  }
}
