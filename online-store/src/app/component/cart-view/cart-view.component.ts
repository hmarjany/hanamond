import { Component, OnInit, ChangeDetectorRef, SimpleChange } from '@angular/core';
import { CartService } from 'src/app/service/Cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from 'src/app/model/Product';
import { server } from 'src/app/Helper/server';
import { Sizes } from 'src/app/model/enum/Sizes';
import { Size } from 'src/app/model/Size';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit {

  productList: Array<Product> ;
  defualtImagePath = 'assets/carousel-1bg.png';
  userId: any;
  totalPrice: number = 0;
  productIds: Array<any> = new Array<any>();
  isDataAvailable = true;
  proccessFaild = false;
  notExistMesseage: string;
  notExist = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private cartService: CartService,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getListFromCach();
  
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
      this.productList.forEach(item => {
        this.totalPrice += item.Count * item.Price;
      })
    })
  }

  private getListFromCach() {
    this.productList = this.cartService.getItems();
    this.productList.forEach((item, i) => {
      if (item.ImagePath === undefined || item.ImagePath === null) {
        item.ImagePath = new Array<String>();
        item.ImagePath.push(this.defualtImagePath);
      } else {
        item.ImagePath.forEach((path, i) => {
          item.ImagePath[i] = 'assets/' + path;
        });
      }
      item.selectedSizeName = Sizes.map(item.selectedSize);
      if (item.Quantity > 0) {
        this.totalPrice += item.Count * item.Price;
      }
    });
  }

  OnProductRemove(product: Product) {
    this.getListFromCach();
    this.totalPrice = 0;
    this.productList.forEach(item => {
      if(item.Quantity > 0){
        this.totalPrice += item.Count * item.Price;
      }
    })
  }

  OnProductChange(product: Product) {
    let productItem = null;
    if(product.Size != undefined && product.Size != null && product.Size.length > 0){
      productItem = this.productList.find(x => x._id === product._id && x.selectedSize === product.selectedSize);
    }else{
      productItem = this.productList.find(x => x._id === product._id);
    }
    if (productItem === undefined || productItem === null) {
      return;
    }

    this.totalPrice = 0;

    if (product.Count === 0) {
      this.productList.splice(this.productList.indexOf(productItem), 1);
    }

    this.totalPrice = 0;
    this.productList.forEach(item => {
      if(item.Quantity > 0){
        this.totalPrice += item.Count * item.Price;
      }
    })
    
    this.cartService.setItems(this.productList);
  }

  endProccess() {
    this.notExist = false;
    this.proccessFaild = false;
    var finalProductItems = new Array<Product>();
    this.productList.forEach((item, i) => {
      if(item.selectedSize != null){
        let productQuantity = item.Size.find(x=>x.size === item.selectedSize);
        if(item.Count >productQuantity.quantity){
          this.notExist = true;
          this.notExistMesseage =" به تعداد " + item.Count + "عدد از کالای " + item.Name+ " به سایز " + Sizes.map(productQuantity.size) +"در انبار موجود نیست  ";
          this.proccessFaild = true;
          return false;
          
        }
      }else{
        if(item.Count > item.Quantity){
          this.notExist = true;
          this.notExistMesseage ="به تعداد " + item.Count + "عدد از کالای " + item.Name+"در انبار موجود نیست";
          this.proccessFaild = true;
          return false;
        }
      }
      if (item.Quantity >= 1) {
        finalProductItems.push(item);
      }
    })
    if(this.proccessFaild){
      return;
    }
    this.cartService.setFinalItems(finalProductItems);
    this.router.navigateByUrl('/confirmcart/'+this.productIds)
    
  }
}
