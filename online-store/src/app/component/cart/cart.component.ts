import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/service/Cart/cart.service';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items: Array<Product>;
  productIds: Array<any> = new Array<any>();
  totalPrice: number = 0;
  @Output() OrderEvent = new EventEmitter();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.initializeCart();
  }

  order(){
    this.OrderEvent.emit();
  }

  private initializeCart() {
    this.items = this.cartService.getItems();
    this.totalPrice = 0;
    this.items.forEach(item => {
      if(item.Quantity > 0){
        this.totalPrice += item.Count * item.Price;
      }
      this.productIds.push(item._id);
      item.ImagePath.forEach((path, i) => {
        var splitPath = path.split('/');
        item.ImagePath[i] = 'assets/cartView/' + splitPath[splitPath.length - 1];
      });
    });
  }

  ngOnChanges(){
    
  }

  removeItem(product){
    this.cartService.removeFromCart(product);
    this.initializeCart();
    this.cartService.getItemsCount();
  }
}
