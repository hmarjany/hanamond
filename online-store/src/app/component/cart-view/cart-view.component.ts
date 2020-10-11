import { Component, OnInit, ChangeDetectorRef, SimpleChange } from '@angular/core';
import { CartService } from 'src/app/service/Cart/cart.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from 'src/app/model/Product';
import { server } from 'src/app/Helper/server';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit {

  productList: Array<Product> = new Array<Product>();
  defualtImagePath = 'assets/carousel-1bg.png';
  userId: any;
  totalPrice: number = 0;
  productIds: Array<any> = new Array<any>();
  isDataAvailable = false;

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private cartService: CartService,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    var cachItems = this.cartService.getItems();
    this.productList = [];
    this.route.params.subscribe(params => {
      let httpParams = new HttpParams()
        .set('productIds', params['productIds'].toString());
      this.http.get<Array<Product>>(server.serverUrl + 'product/getByIds', { params: httpParams }).subscribe(items => {
        items.map((item, i) => {
          if (item.ImagePath === undefined || item.ImagePath === null) {
            item.ImagePath = new Array<String>();
            item.ImagePath.push(this.defualtImagePath);
          } else {
            item.ImagePath.forEach((path, i) => {
              item.ImagePath[i] = 'assets/' + path;
            })
          }
          this.productIds.push(item._id);
          item.DiscountPrice = item.LastPrice != undefined && item.LastPrice != 0 && item.LastPrice != null ? item.LastPrice : 0;
          item.DiscountPercent = item.LastPrice != undefined && item.LastPrice != 0 && item.LastPrice != null ? Math.round(100 - ((item.Price * 100) / item.LastPrice)) : 0;
          var product = cachItems.find(x => x._id === item._id);
          if (product != null) {
            if (item.Count != 0 || item.Count != null || item.Count != undefined) {
              if (!this.productList.find(x => x._id === item._id)) {
                item.Count = product.Count;
                if (item.Quantity > 0) {
                  this.totalPrice += item.Count * item.Price;
                }
                this.productList.push(item)
              }
            }
          }
        })

        this.cartService.setItems(this.productList);
        //sthis.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
        this.changeDetectorRef.detectChanges();
        this.isDataAvailable = true;
      });
    });

    this.cartService.getRemoveEventEmitter().subscribe((item: Product) => {
      var productItem = this.productList.find(x => x._id === item._id);
      if (productItem === undefined || productItem === null) {
        return;
      }
      var itemIndex = this.productList.indexOf(productItem);
      this.productList[itemIndex].Count -= 1;

      if (productItem.Count === 0) {
        this.productList.splice(this.productList.indexOf(productItem), 1);
      }

      this.totalPrice = 0;
      this.productList.map(item => {
        this.totalPrice += item.Count * item.Price;
      })
    })
  }

  OnProductRemove(product: Product) {
    var productItem = this.productList.find(x => x._id === product._id);
    if (productItem === undefined || productItem === null) {
      return;
    }

    this.totalPrice = 0;
    this.productList.splice(this.productList.indexOf(productItem), 1);
    this.productList.map(item => {
      this.totalPrice += item.Count * item.Price;
    })

    this.cartService.setItems(this.productList);
  }

  OnProductChange(product: Product) {
    var productItem = this.productList.find(x => x._id === product._id);
    if (productItem === undefined || productItem === null) {
      return;
    }

    this.totalPrice = 0;

    if (product.Count === 0) {
      this.productList.splice(this.productList.indexOf(productItem), 1);
    }

    this.productList.map(item => {
      if (item._id === product._id) {
        item.Count = product.Count;
      }

      this.totalPrice += item.Count * item.Price;
    })

    this.cartService.setItems(this.productList);
  }

  endProccess(){
    var finalProductItems = new Array<Product>();
    this.productList.forEach((item, i)=>{
      if(item.Quantity>=1){
        finalProductItems.push(item);
      }
    })
    this.cartService.setFinalItems(finalProductItems);
  }
}
