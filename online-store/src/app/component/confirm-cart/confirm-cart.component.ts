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
    let httpParams = new HttpParams()
      .set('userId', JSON.parse(localStorage.getItem('currentUser'))._id);
    this.http.get<User>('http://127.0.0.1:3100/users/getById', { params: httpParams }).subscribe(data => {
      this.currentUser = data;
      this.address  = this.currentUser.address;
      if(this.address[0] != undefined){
        this.selectedAddress = this.address[0].address;
        this.selectedAddressDeliverTo = this.address[0].deliverTo;
      }
    });

    this.route.params.subscribe(params => {
      let httpParams = new HttpParams()
        .set('productIds', params['productIds'].toString());
      this.http.get<Array<Product>>('http://127.0.0.1:3100/product/getByIds', { params: httpParams }).subscribe(items => {
        items.map(item => {
          if (item.ImagePath === undefined || item.ImagePath === null) {
            item.ImagePath = new Array<String>();
            item.ImagePath.push(this.defualtImagePath);
          } else {
            item.ImagePath.forEach((path, i) => {
              item.ImagePath[i] = 'assets/' + path;
            })
          }
        })
        this.productList = items;
        this.isDataAvailable = true;
      });
    });
  }

  editAddressView(){
    if(this.editAddress === false){
      this.editAddress = true;
    }else{
      this.editAddress = false;
    }
  }

  payment(){
    var purchasedItems = new Array<PurchasedItem>();
    this.productList.forEach(item =>{
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

    this.http.post<Purchased>('http://127.0.0.1:3100/purchased/save',purchased).subscribe(data =>{

    });
  }
}
