import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CartService } from 'src/app/service/Cart/cart.service';
import { Product } from 'src/app/model/Product';
import { Zarinpal } from 'src/app/model/Zarinpal';
import { server } from 'src/app/Helper/server';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/User';
import { Purchased } from 'src/app/model/Purchased';
import { Order } from 'src/app/model/Order';

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

  constructor(private http: HttpClient,
    private cartService: CartService,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,) { }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.productList = this.cartService.getFinalItems();
    if(this.productList === undefined){
      return;
    }

    if(this.productList === null){
      return;
    }
    
    this.productList.map((item, i) => {
      this.totalPrice += item.Count * item.Price;
    })

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
            this.cartService.clearCart();
            this.http.post(server.serverUrl + 'purchased/updaterefid', zarinpal).subscribe(response => {
              this.getUserPurchasedHistory();
            });
          }else{
            this.getUserPurchasedHistory();
          }
        });
      }
    })
  }


  private getUserPurchasedHistory() {
    let httpParamsUser = new HttpParams()
      .set('userId', JSON.parse(localStorage.getItem('currentUser'))._id);
    this.http.get<User>(server.serverUrl + 'users/getFullById', { params: httpParamsUser }).subscribe(users => {
      this.currentUser = users;
      this.purchasedHistory = this.currentUser[0].purchased.sort((n1, n2)=>{
        if(n1.purchaseDate > n2.purchaseDate){
          return -1;
        }
        if(n1.purchaseDate < n2.purchaseDate){
          return 1;
        }
      });
      this.isDataAvailable = true;
    });
  }

  expansion(index){
    let httpParamsUser = new HttpParams()
      .set('Authority', this.purchasedHistory[index].athority);
    this.http.get<Order>(server.serverUrl + 'order/getByAuthority', { params: httpParamsUser }).subscribe(order => {
      this.purchasedHistory[index].selectedIndex = 0;
      if(order === null){
        return;
      }

      if(order.pickUp){
        this.purchasedHistory[index].selectedIndex = 1;
      }

      if(order.deliverdStatus){
        this.purchasedHistory[index].selectedIndex = 2;
      }

      if(order.recieve){
        this.purchasedHistory[index].selectedIndex = 3;
      }
      this.changeDetectorRef.detectChanges();
    });
  }
}
