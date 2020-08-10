import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/Cart/cart.service';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  product :Product;

  constructor(private route: ActivatedRoute,
    private cartService: CartService) { 
      this.product = new Product();
      this.product.Name = "test01";
      this.product.Price = 1000;
    }

  ngOnInit(): void {
  }

  addToCart(product) {
    this.cartService.addToCart(product);
    this.cartService.getItemsCount();
  }
}
