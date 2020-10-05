import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { server } from 'src/app/Helper/server';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() productList: Product[];
  defualtImagePath = 'assets/carousel-1bg.png';
  isDataAvailable = false;

  constructor(private http: HttpClient) { 
    this.productList =[
    ];
  }

  ngOnInit(): void {
    let httpParams = new HttpParams()
        .set('Category', '1')
        .set('CategoryType', '1')
        .set('SubCategory', '0');
    this.http.get<Product[]>(server.serverUrl + 'product/getListByPaging', { params: httpParams}).subscribe(data => {
      data.forEach((item) => {
        item.DiscountPrice = item.LastPrice != undefined && item.LastPrice != 0 && item.LastPrice != null ? item.LastPrice : 0;
        item.DiscountPercent = item.LastPrice != undefined && item.LastPrice != 0 && item.LastPrice != null ? Math.round(100 - ((item.Price * 100) / item.LastPrice)) : 0;
        if (item.ImagePath === undefined || item.ImagePath === null) {
          item.ImagePath = new Array<String>();
          item.ImagePath.push(this.defualtImagePath);
        }
        else {
          item.ImagePath[0] = 'assets/productItem/' + item.ImagePath[0];
        }
      });
      this.productList = data;
      this.isDataAvailable = true;
    });
  }

}
