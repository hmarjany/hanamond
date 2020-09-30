import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Address } from 'src/app/model/Address';
import { User } from 'src/app/model/User';
import { Purchased } from 'src/app/model/Purchased';
import { PurchasedItem } from 'src/app/model/PurchasedItem';
import { CartService } from 'src/app/service/Cart/cart.service';
import { server } from 'src/app/Helper/server';
import { Order } from 'src/app/model/Order';

@Component({
  selector: 'app-confirm-cart',
  templateUrl: './confirm-cart.component.html',
  styleUrls: ['./confirm-cart.component.scss']
})
export class ConfirmCartComponent implements OnInit {

  productList: Array<Product> = new Array<Product>();
  editAddress: boolean = false;
  address: Address[] = new Array<Address>();
  currentUser: User;
  defualtImagePath = 'assets/carousel-1bg.png';
  selectedAddress: string = '';
  selectedAddressDeliverTo: string = '';
  selectedAddressPhone: string = '';
  isDataAvailable = false;
  totalPrice: number = 0;
  showSaveRibbon = true;

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private cartService: CartService) {
      
  }

  ngOnInit(): void {
    this.loadAddress();
    this.productList = this.cartService.getFinalItems();
      this.productList.map((item, i)=>{
        this.totalPrice += item.Count * item.Price;
        item.ImagePath.forEach((path, i) => {
          var splitPath = path.split('/');
          item.ImagePath[i] = 'assets/cartView/' + splitPath[splitPath.length - 1];
        });
      })
  }

  private loadAddress() {
    let httpParams = new HttpParams()
      .set('userId', JSON.parse(localStorage.getItem('currentUser'))._id);
    this.http.get<User>(server.serverUrl + 'users/getById', { params: httpParams }).subscribe(data => {
      this.currentUser = data;
      this.address = this.currentUser.address;
      if (this.address != undefined && this.address != null && this.address.length > 0) {
        var hasCurrentAddress = false;
        this.address.map((item, i) => {
          if (item.isCurrent) {
            hasCurrentAddress = true;
          }
        });

        if (!hasCurrentAddress) {
          this.address[0].isCurrent = true;
        }
      }

      if (this.address != undefined && this.address != null && this.address.length > 0) {
        var currentAddress = this.address.find(x => x.isCurrent === true);
        this.selectedAddress = currentAddress.address;
        this.selectedAddressDeliverTo = currentAddress.deliverTo;
        this.selectedAddressPhone = currentAddress.mobilePhone;
      } else {
        this.editAddress = true;
      }

      this.isDataAvailable = true;
    });
  }

  onAddNewAddressEvent(){
    this.showSaveRibbon = false;
  }

  onAddOrEditAddressEvent(){
    this.showSaveRibbon = true;
  }

  editAddressView() {
    if (this.editAddress === false) {
      this.editAddress = true;
    } else {
      this.editAddress = false;
    }
  }

  onAddressChange(index: number){
  }

  saveAddress() {
    if (this.address != undefined && this.address != null) {
      this.currentUser.address = this.address;
      this.http.post<User>(server.serverUrl + 'users/updateUser', this.currentUser).subscribe(data => {
        this.address = data.address;
        this.currentUser = data;
        this.editAddress = false;
        var currentAddress = data.address.find(x => x.isCurrent === true);
        this.selectedAddress = currentAddress.address;
        this.selectedAddressDeliverTo = currentAddress.deliverTo;
        this.selectedAddressPhone = currentAddress.mobilePhone;
      });
    }
  }

  cancelAddress() {
    this.loadAddress();
    this.editAddress = false;
  }

  payment() {
    var order = new Order();
    
    var purchasedItems = new Array<PurchasedItem>();
    this.productList.forEach(item => {
      var purchasedItem = new PurchasedItem();
      purchasedItem.count = 1;
      purchasedItem.name = item.Name.toString();
      purchasedItem.productId = item._id;
      purchasedItems.push(purchasedItem)
    })

    order.purchasedItem = purchasedItems;
    order.totalPrice = this.totalPrice;

    var purchased = new Purchased();
    purchased.address = this.selectedAddress;
    purchased.deliver = false;
    purchased.deliverTo = this.selectedAddressDeliverTo;
    purchased.deliverToPhone = this.selectedAddressPhone;
    purchased.payOnline = false;
    purchased.purchaseDate = new Date();
    purchased.purchasedItem = purchasedItems;
    purchased.userId = this.currentUser._id;
    purchased.userName = this.currentUser.name.toString();
    purchased.userNamePhone = this.currentUser.phoneNumber.toString();
    
    order.address = this.selectedAddress;
    order.deliverTo = this.selectedAddressDeliverTo;
    order.deliverToPhone = this.selectedAddressPhone;

    order.purchasedUserDetails = purchased;

    this.http.post<Order>(server.serverUrl + 'purchased/save', order).subscribe(data => {

    });
  }
}
