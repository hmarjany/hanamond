import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/model/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  removeEvent: EventEmitter<Product> = new EventEmitter();

  constructor() {
    this.items = [];
  }

  items: Array<Product> = new Array<Product>();
  finalItems: Array<Product> = new Array<Product>();
  itemsCountChange: Subject<number> = new Subject<number>();

  getFinalItems(): Array<Product> {
    this.finalItems = JSON.parse(localStorage.getItem('hanamondcartfinalsatatus'));
    return this.finalItems;
  }

  setFinalItems(products: Array<Product>) {
    this.finalItems = new Array<Product>();
    this.finalItems = products;
    localStorage.setItem('hanamondcartfinalsatatus', JSON.stringify(this.finalItems));
  }

  getRemoveEventEmitter() {
    return this.removeEvent;
  }

  setItems(products: Array<Product>) {
    this.items = [];
    products.forEach(val => this.items.push(Object.assign({}, val)));
    localStorage.setItem('hanamondcartsatatus', JSON.stringify(this.items));
    this.getItemsCount();
  }

  addToCart(product: Product) {
    if (product.selectedSize != undefined && product.selectedSize != null) {
      if (this.items.find(x => x._id === product._id && x.selectedSize === product.selectedSize) != null) {
        (this.items.find(x => x._id === product._id && x.selectedSize === product.selectedSize).Count as number) += 1;
      } else {
        this.items.push(product);
      }
      localStorage.setItem('hanamondcartsatatus', JSON.stringify(this.items));
    } else {
      if (this.items.find(x => x._id === product._id) != null) {
        (this.items.find(x => x._id === product._id).Count as number) += 1;
      } else {
        this.items.push(product);
      }
      localStorage.setItem('hanamondcartsatatus', JSON.stringify(this.items));
    }
  }

  getItems() {
    this.items = JSON.parse(localStorage.getItem('hanamondcartsatatus'));
    if (this.items === null) {
      this.items = [];
    }
    return this.items;
  }

  setAuthority(authority: any) {
    localStorage.setItem('hanamondAuthority', JSON.stringify(authority));
  }

  getAuthority() {
    JSON.parse(localStorage.getItem('hanamondAuthority'));
  }

  removeFromCart(product: Product) {
    if (product.selectedSize != undefined && product.selectedSize != null) {
      if (this.items.find(x => x._id === product._id && x.selectedSize === product.selectedSize) != null) {
        var productCount = this.items.find(x => x._id === product._id  && x.selectedSize === product.selectedSize).Count;
        if (productCount > 1) {
          (this.items.find(x => x._id === product._id  && x.selectedSize === product.selectedSize).Count) -= 1;
        }
        else {
          var itemIndex = this.items.indexOf(product, 0);
          this.items.splice(itemIndex, 1);
        }
      } else {
        var itemIndex_ = this.items.indexOf(product, 0);
        this.items.splice(itemIndex_, 1);
      }
      var items = JSON.stringify(this.items)
      localStorage.setItem('hanamondcartsatatus', items);
    } else {
      if (this.items.find(x => x._id === product._id) != null) {
        var productCount = this.items.find(x => x._id === product._id).Count;
        if (productCount > 1) {
          (this.items.find(x => x._id === product._id).Count) -= 1;
        }
        else {
          var itemIndex = this.items.indexOf(product, 0);
          this.items.splice(itemIndex, 1);
        }
      } else {
        var itemIndex_ = this.items.indexOf(product, 0);
        this.items.splice(itemIndex_, 1);
      }
      var items = JSON.stringify(this.items)
      localStorage.setItem('hanamondcartsatatus', items);
    }
  }

  removeCartExpEvent(product: Product) {

    if (this.items.find(x => x._id === product._id) != null) {
      var productCount = this.items.find(x => x._id === product._id).Count;
      if (productCount > 1) {
        (this.items.find(x => x._id === product._id).Count) -= 1;
      }
      else {
        var itemIndex = this.items.indexOf(product, 0);
        this.items.splice(itemIndex, 1);
      }
    } else {
      var itemIndex_ = this.items.indexOf(product, 0);
      this.items.splice(itemIndex_, 1);
    }
    localStorage.setItem('hanamondcartsatatus', JSON.stringify(this.items));
  }

  clearCart() {
    localStorage.setItem('hanamondcartsatatus', null);
    this.items = JSON.parse(localStorage.getItem('hanamondcartsatatus'));

    localStorage.setItem('hanamondcartfinalsatatus', null);
    this.finalItems = JSON.parse(localStorage.getItem('hanamondcartfinalsatatus'));
  }

  getItemsCount() {
    this.getItems();
    var itemlength = 0;
    if (this.items != null) {
      this.items.forEach((item) => {
        itemlength += item.Count;
      })
    }

    if (itemlength === 0) {
      itemlength = undefined;
      localStorage.setItem('hanamondcartfinalsatatus', null);
      this.finalItems = JSON.parse(localStorage.getItem('hanamondcartfinalsatatus'));
    }

    this.itemsCountChange.next(itemlength);
  }
}
