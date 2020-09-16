import { Component, OnInit, Input, HostListener, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/service/Cart/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() productList: Product[];
  @Input() PrdouctPage: boolean;
  @Input() CartPage: boolean = false;
  @Input() MobileView: boolean = false;
  @Input() ConfirmCartView: boolean = false;
  @Output() ProductEvent = new EventEmitter<Product>();
  @Output() RemoveEvent = new EventEmitter<Product>();
  contentAfterWidth: any;
  contentAfterPadding: any;
  contentAfterMargin: any;
  
  constructor(private cartService: CartService) {
    
   }

  ngOnInit(): void { 
  }

  onValueChanged(value: number): void {
  }

  removeItem(product: Product) {
    var cartProduct = this.cartService.items.find(x=> x._id === product._id);
    cartProduct.Count = 1;
    this.cartService.removeFromCart(cartProduct);
    this.cartService.getItemsCount();
    this.RemoveEvent.emit(cartProduct);
  }

  stepUp(product: Product){
    product.Count += 1;
    this.cartService.addToCart(product);
    this.cartService.getItemsCount();
    this.ProductEvent.emit(product);
  }

  stepDown(product: Product){
      product.Count -= 1;
      this.cartService.removeCartExpEvent(product);
      this.cartService.getItemsCount();
      this.ProductEvent.emit(product);
  }

  customOptions: OwlOptions = {
    autoWidth: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    center: true,
    autoHeight: true,
    autoplay: true,
    navSpeed: 700,
    rtl: true,
    dots: false,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
}
