import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/Cart/cart.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit {

  productList: any;
  constructor(private cartService: CartService) {
    this.productList =  cartService.getItems();
   }

  ngOnInit(): void {
  }

}
