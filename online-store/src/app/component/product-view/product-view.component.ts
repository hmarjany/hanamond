import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/Cart/cart.service';
import { Product } from 'src/app/model/Product';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  product :Product;
  defualtImagePath = 'assets/carousel-1bg.png'
  imagePaths: Array<String>;
  
  constructor(private route: ActivatedRoute,
    private cartService: CartService, 
    private http: HttpClient) { 
      
    }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let httpParams = new HttpParams()
        .set('productId', params['productId'].toString());
      this.http.get<Product>('http://127.0.0.1:3100/product/getById', { params: httpParams }).subscribe(item => {
          if(item.ImagePath === undefined || item.ImagePath === null){
            item.ImagePath = new Array<String>();
            item.ImagePath.push(this.defualtImagePath);
          }else{
            item.ImagePath.forEach((path, i) =>{
              item.ImagePath[i] = 'assets/' + path;
            })
          }
        this.product = item;
        this.imagePaths = item.ImagePath;
      });
    });
  }

  addToCart(product) {
    this.cartService.addToCart(product);
    this.cartService.getItemsCount();
  }
}
