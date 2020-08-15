import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/Cart/cart.service';

@Component({
  selector: 'app-confirm-cart',
  templateUrl: './confirm-cart.component.html',
  styleUrls: ['./confirm-cart.component.scss']
})
export class ConfirmCartComponent implements OnInit {

  productList: any;
  constructor(private cartService: CartService) { 
    this.productList =  cartService.getItems();
  }

  ngOnInit(): void {
    
  }

}
