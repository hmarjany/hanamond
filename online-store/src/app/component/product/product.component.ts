import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Count } from 'src/app/model/Count';
import { server } from 'src/app/Helper/server';
import { SubCategory } from 'src/app/model/enum/SubCategory';
import { Brand } from 'src/app/model/enum/Brand';
import { Category } from 'src/app/model/enum/category';
import { CategoryType } from 'src/app/model/enum/CategoryType';
import { Sizes } from 'src/app/model/enum/Sizes';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productList: Product[];
  category: number;
  categoryType: number;
  subCategory: number;
  perPage = 12;
  defualtImagePath = 'assets/carousel-1bg.png';
  totalPage :any;
  isDataAvailable = false;
  product: Product = new Product();

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.productList = []
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['Category'];
      this.categoryType = params['CategoryType'];
      this.subCategory = params['SubCategory'];

      var productFilter = new Product();
      productFilter.Category = this.category;
      productFilter.CategoryType = this.categoryType;
      productFilter.SubCategory = this.subCategory;
      let httpParams = new HttpParams()
        .set('Category', productFilter.Category.toString())
        .set('CategoryType', productFilter.CategoryType.toString())
        .set('SubCategory', productFilter.SubCategory.toString());
      this.http.get<Count>(server.serverUrl + 'product/getAllCount', { params: httpParams}).subscribe(data => {
        this.totalPage = Math.ceil( data.result / this.perPage);
        this.listByPaging(1);
      });
    });
  }

  

  onPageNumber(pageNumber: number) {
    this.listByPaging(pageNumber);
  }

  private listByPaging(pageNumber) {
    this.route.params.subscribe(params => {
      this.category = params['Category'];
      this.categoryType = params['CategoryType'];
      this.subCategory = params['SubCategory'];

      var productFilter = new Product();
      productFilter.Category = this.category;
      productFilter.CategoryType = this.categoryType;
      productFilter.SubCategory = this.subCategory;
      productFilter.limit = this.perPage;
      productFilter.skip = this.perPage * (pageNumber - 1);
      let httpParams = new HttpParams()
        .set('Category', productFilter.Category.toString())
        .set('CategoryType', productFilter.CategoryType.toString())
        .set('SubCategory', productFilter.SubCategory.toString())
        .set('limit', productFilter.limit.toString())
        .set('skip', productFilter.skip.toString());
      this.http.get<Product[]>(server.serverUrl + 'product/getListByPaging', { params: httpParams }).subscribe(data => {
        data.forEach((item) => {
          let quantity = 0;
          item.DiscountPrice = item.LastPrice != undefined && item.LastPrice != 0 && item.LastPrice != null ? item.LastPrice : 0;
          item.DiscountPercent = item.LastPrice != undefined && item.LastPrice != 0 && item.LastPrice != null ? Math.round(100 - ((item.Price * 100) / item.LastPrice)) : 0;
          if (item.ImagePath === undefined || item.ImagePath === null) {
            item.ImagePath = new Array<String>();
            item.ImagePath.push(this.defualtImagePath);
          }
          else {
            item.ImagePath[0] = 'assets/productItem/' + item.ImagePath[0];
          }

          if(item.Size != undefined && item.Size != null){
            item.Size.map((itemProduct,i) => {
              item.Size[i].sizeName = Sizes.map(itemProduct.size);
              quantity += itemProduct.quantity;
            })
          }

          item.Quantity = quantity;
        });
        this.productList = data;
        this.product = this.productList[0];
        this.product.BrandName = Brand.map(this.product.Barnd);
        this.product.CategoryName = Category.map(this.product.Category);
        this.product.CategoryTypeName = CategoryType.map(this.product.CategoryType);
        this.product.SubCategoryName = SubCategory.map(this.product.SubCategory);
        
        this.isDataAvailable = true;
        
      });
    });
  }
}
