import { Component, OnInit } from '@angular/core';
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

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.items.forEach(item=>{
      this.totalPrice += (item.Count as number)*(item.Price as number);
      this.productIds.push(item._id);
    });
  }

  removeItem(product){
    this.cartService.removeFromCart(product);
    this.cartService.getItemsCount();
  }
}
