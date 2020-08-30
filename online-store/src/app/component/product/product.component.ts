import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productList: Product[];
  pageNumber: number = 1;
  category: number;
  categoryType: number;
  subCategory: number;
  perPage = 12;

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
      productFilter.limit = this.perPage;
      productFilter.skip = this.perPage * (this.pageNumber - 1);
      let httpParams = new HttpParams()
        .set('Category', productFilter.Category.toString())
        .set('CategoryType', productFilter.CategoryType.toString())
        .set('SubCategory', productFilter.SubCategory.toString())
        .set('limit', productFilter.limit.toString())
        .set('skip', productFilter.skip.toString());
      this.http.get<Product[]>('http://127.0.0.1:3100/product/getListByPaging', { params: httpParams }).subscribe(data => {
        this.productList = data;
      });
    });
  }

  onPageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
  }
}
