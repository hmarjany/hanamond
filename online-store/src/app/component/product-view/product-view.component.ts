import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/Cart/cart.service';
import { Product } from 'src/app/model/Product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Brand } from 'src/app/model/enum/Brand';
import { Category } from 'src/app/model/enum/category';
import { CategoryType } from 'src/app/model/enum/CategoryType';
import { SubCategory } from 'src/app/model/enum/SubCategory';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  product: Product;
  defualtImagePath = 'assets/carousel-1bg.png'
  imagePaths: Array<String>;
  isDataAvailable = false;

  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private http: HttpClient) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let httpParams = new HttpParams()
        .set('productId', params['productId'].toString());
      this.http.get<Product>('http://127.0.0.1:3100/product/getById', { params: httpParams }).subscribe(item => {
        if (item.ImagePath === undefined || item.ImagePath === null) {
          item.ImagePath = new Array<String>();
          item.ImagePath.push(this.defualtImagePath);
        } else {
          item.ImagePath.forEach((path, i) => {
            item.ImagePath[i] = 'assets/' + path;
          })
        }

        item.AdditinalInfos.forEach((addInfo, i) => {
          if (addInfo.value === '') {
            item.AdditinalInfos.splice(i);
          }
        })
        item.BrandName = Brand.map(item.Barnd);
        item.CategoryName = Category.map(item.Category);
        item.CategoryTypeName = CategoryType.map(item.CategoryType);
        item.SubCategoryName = SubCategory.map(item.SubCategory);
        this.product = item;
        this.imagePaths = item.ImagePath;
        this.isDataAvailable = true;
      });
    });
  }

  addToCart(product) {
    this.cartService.addToCart(product);
    this.cartService.getItemsCount();
  }
}
