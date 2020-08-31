import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Count } from 'src/app/model/Count';

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
      this.http.get<Count>('http://127.0.0.1:3100/product/getAllCount', { params: httpParams}).subscribe(data => {
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
      this.http.get<Product[]>('http://127.0.0.1:3100/product/getListByPaging', { params: httpParams }).subscribe(data => {
        data.forEach((item) => {
          if (item.ImagePath === undefined || item.ImagePath === null) {
            item.ImagePath = new Array<String>();
            item.ImagePath.push(this.defualtImagePath);
          }
          else {
            item.ImagePath[0] = 'assets/' + item.ImagePath[0];
          }
        });
        this.productList = data;
        this.isDataAvailable = true;
      });
    });
  }
}
