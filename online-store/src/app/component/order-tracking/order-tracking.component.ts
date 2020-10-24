import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CartService } from 'src/app/service/Cart/cart.service';
import { Product } from 'src/app/model/Product';
import { Zarinpal } from 'src/app/model/Zarinpal';
import { server } from 'src/app/Helper/server';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/User';
import { Purchased } from 'src/app/model/Purchased';
import { Order } from 'src/app/model/Order';
import { ProductInventory } from 'src/app/model/ProductInventory';
import { Size } from 'src/app/model/Size';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class OrderTrackingComponent implements OnInit, AfterViewInit {

  totalPrice: number = 0;
  productList: Array<Product> = new Array<Product>();
  currentUser: User;
  purchasedHistory = new Array<Purchased>();
  isDataAvailable = false;
  refId: string;
  transactionFaild = false;
  transactionOk = false;

  constructor(private http: HttpClient,
    private cartService: CartService,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,) { }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    let productInventory = Array<ProductInventory>();
    this.productList = this.cartService.getFinalItems();
    if (this.productList != undefined && this.productList != null) {
      this.productList.map((item, i) => {
        this.totalPrice += item.Count * item.Price;
        let productInventoryItem = new ProductInventory();
        productInventoryItem.quantity = item.Count;
        if(item.selectedSize != undefined && item.selectedSize != null){
          let size = new Size();
          size.size = item.selectedSize;
          size.quantity = item.Quantity;
          productInventoryItem.SelectedSize = size;
        }else{
          productInventoryItem.SelectedSize = null;
        }

        productInventoryItem.productId = item._id;
        productInventory.push(productInventoryItem);
      })
    }

    this.route.queryParams.subscribe(params => {
      let zarinpal = new Zarinpal();
      zarinpal.Amount = this.totalPrice;
      zarinpal.Authority = params.Authority;
      

      if (zarinpal.Authority === undefined) {
        this.getUserPurchasedHistory();
      } else {
        this.http.post<Zarinpal>(server.serverUrl + 'zarinpal/paymentverification', zarinpal).subscribe(data => {
          if (data.refId != -1) {
            this.refId = data.refId;
            zarinpal.refId = data.refId;
            zarinpal.Authority = params.Authority;
            zarinpal.productInventory = productInventory;
            this.cartService.clearCart();
            this.cartService.getItemsCount();
            this.http.post(server.serverUrl + 'purchased/updaterefid', zarinpal).subscribe(response => {
              this.transactionOk = true;
              this.getUserPurchasedHistory();
            });
          } else {
            this.getRefIdByAuthority(zarinpal.Authority);

          }
        });
      }
    })
  }

  private getRefIdByAuthority(authority) {
    let httpParamsUser = new HttpParams()
      .set('authority', authority);
    this.http.get<Purchased>(server.serverUrl + 'purchased/getRefIdByAuthority', { params: httpParamsUser }).subscribe(purchased => {
      if (purchased != undefined && purchased != null) {
        if (purchased.refId != undefined && purchased.refId != null) {
          this.transactionOk = true;
          this.getUserPurchasedHistory();
        } else {
          this.transactionFaild = true;
          this.isDataAvailable = true;
        }
      }
    });
  }


  private getUserPurchasedHistory() {
    let httpParamsUser = new HttpParams()
      .set('userId', JSON.parse(localStorage.getItem('currentUser'))._id);
    this.http.get<User>(server.serverUrl + 'users/getFullById', { params: httpParamsUser }).subscribe(users => {
      this.currentUser = users;
      let purchased = this.currentUser[0].purchased.filter(x => x.refId != undefined && x.refId != null);
      if (purchased != undefined && purchased != null) {
        this.purchasedHistory = purchased.sort((n1, n2) => {
          if (n1.purchaseDate > n2.purchaseDate) {
            return -1;
          }
          if (n1.purchaseDate < n2.purchaseDate) {
            return 1;
          }
        });
      }
      this.isDataAvailable = true;

    });
  }

  expansion(index) {
    let httpParamsUser = new HttpParams()
      .set('Authority', this.purchasedHistory[index].athority);
    this.http.get<Order>(server.serverUrl + 'order/getByAuthority', { params: httpParamsUser }).subscribe(order => {
      this.purchasedHistory[index].selectedIndex = 0;
      if (order === null) {
        return;
      }

      if (order.pickUp) {
        this.purchasedHistory[index].selectedIndex = 1;
      }

      if (order.deliverdStatus) {
        this.purchasedHistory[index].selectedIndex = 2;
      }

      if (order.recieve) {
        this.purchasedHistory[index].selectedIndex = 3;
      }
      this.changeDetectorRef.detectChanges();
    });
  }
}
