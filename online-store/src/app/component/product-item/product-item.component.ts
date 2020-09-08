import { Component, OnInit, Input } from '@angular/core';
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
  contentAfterWidth: any;
  contentAfterPadding: any;
  contentAfterMargin: any;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    if (this.productList === undefined) {
      this.contentAfterWidth = null;
      this.contentAfterPadding = '0%';
      this.contentAfterMargin = '0px';
    } else {
      if (this.productList.length % 3 == 0) {
        this.contentAfterWidth = null;
        this.contentAfterPadding = '0%';
        this.contentAfterMargin = '0px';
      }

      if (this.productList.length % 3 == 1) {
        this.contentAfterWidth = '58.4%';
        this.contentAfterPadding = '2%';
        this.contentAfterMargin = '1px';
      }

      if (this.productList.length % 3 == 2) {
        this.contentAfterWidth = '25%';
        this.contentAfterPadding = '2%';
        this.contentAfterMargin = '1px';
      }
    }
  }

  onValueChanged(value: number): void {
  }

  removeItem(product) {
    this.cartService.removeFromCart(product);
    this.cartService.getItemsCount();
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
