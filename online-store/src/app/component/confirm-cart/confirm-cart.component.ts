import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Address } from 'src/app/model/Address';
import { User } from 'src/app/model/User';
import { Purchased } from 'src/app/model/Purchased';
import { PurchasedItem } from 'src/app/model/PurchasedItem';

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
  selectedAddress: String = '';
  selectedAddressDeliverTo: String = '';
  isDataAvailable = false;

  constructor(private route: ActivatedRoute,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadAddress();
  }

  private loadAddress() {
    let httpParams = new HttpParams()
      .set('userId', JSON.parse(localStorage.getItem('currentUser'))._id);
    this.http.get<User>('http://127.0.0.1:3100/users/getById', { params: httpParams }).subscribe(data => {
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
      } else {
        this.editAddress = true;
      }

      this.isDataAvailable = true;
    });
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
      this.http.post<User>('http://127.0.0.1:3100/users/updateUser', this.currentUser).subscribe(data => {
        this.address = data.address;
        this.currentUser = data;
        this.editAddress = false;
        var currentAddress = data.address.find(x => x.isCurrent === true);
        this.selectedAddress = currentAddress.address;
        this.selectedAddressDeliverTo = currentAddress.deliverTo;

      });
    }
  }

  cancelAddress() {
    this.loadAddress();
    this.editAddress = false;
  }

  payment() {
    var purchasedItems = new Array<PurchasedItem>();
    this.productList.forEach(item => {
      var purchasedItem = new PurchasedItem();
      purchasedItem.count = 1;
      purchasedItem.name = item.Name.toString();
      purchasedItem.productId = item._id;
      purchasedItems.push(purchasedItem)
    })
    var purchased = new Purchased();
    purchased.address = this.address[0].address;
    purchased.deliver = false;
    purchased.deliverTo = this.address[0].deliverTo;
    purchased.deliverToPhone = this.address[0].mobilePhone;
    purchased.payOnline = false;
    purchased.purchaseDate = new Date();
    purchased.purchasedItem = purchasedItems;
    purchased.userId = this.currentUser._id;
    purchased.userName = this.currentUser.name.toString();
    purchased.userNamePhone = this.currentUser.phoneNumber.toString();

    this.http.post<Purchased>('http://127.0.0.1:3100/purchased/save', purchased).subscribe(data => {

    });
  }
}
