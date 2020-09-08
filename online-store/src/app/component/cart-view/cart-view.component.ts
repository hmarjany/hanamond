import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CartService } from 'src/app/service/Cart/cart.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit {

  productList: any;
  defualtImagePath = 'assets/carousel-1bg.png';
  userId: any;
  productIds: Array<any> = new Array<any>();
  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
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
          this.productIds.push(item._id);
        })
        this.productList = items;
        this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
        this.changeDetectorRef.detectChanges();
      });
    });

    
  }
}
