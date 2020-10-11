import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/service/Cart/cart.service';
import { Product } from 'src/app/model/Product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Brand } from 'src/app/model/enum/Brand';
import { Category } from 'src/app/model/enum/category';
import { CategoryType } from 'src/app/model/enum/CategoryType';
import { SubCategory } from 'src/app/model/enum/SubCategory';
import { server } from 'src/app/Helper/server';

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
  items: Array<Product>;
  productIds: Array<any> = new Array<any>();

  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private http: HttpClient,
    private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let httpParams = new HttpParams()
        .set('productId', params['productId'].toString());
      this.http.get<Product>(server.serverUrl + 'product/getById', { params: httpParams }).subscribe(item => {
        if (item.ImagePath === undefined || item.ImagePath === null) {
          item.ImagePath = new Array<String>();
          item.ImagePath.push(this.defualtImagePath);
        } else {
          item.ImagePath.forEach((path, i) => {
            item.ImagePath[i] = 'assets/productView/' + path;
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
        item.DiscountPrice = item.LastPrice != undefined && item.LastPrice != 0 && item.LastPrice != null ? item.LastPrice : 0;
        item.DiscountPercent = item.LastPrice != undefined && item.LastPrice != 0 && item.LastPrice != null ? Math.round(100 - ((item.Price * 100) / item.LastPrice)) : 0;
        item.isProductAvailable = item.Quantity > 0;
        item.Count = 1;
        this.product = item;
        this.imagePaths = item.ImagePath;
        this.isDataAvailable = true;
      });
    });
  }

  addToCart(product: Product) {
    if (product.isProductAvailable) {
      this.cartService.addToCart(product);
      this.cartService.getItemsCount();
      this.items = this.cartService.getItems();
      this.items.forEach(item => {
        this.productIds.push(item._id);
      });
      this.router.navigateByUrl('/cartview/' + this.productIds);
    }
  }
}
