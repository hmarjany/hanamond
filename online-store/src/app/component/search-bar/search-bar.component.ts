import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { server } from 'src/app/Helper/server';
import { Category } from 'src/app/model/enum/category';
import { CategoryType } from 'src/app/model/enum/CategoryType';
import { SubCategory } from 'src/app/model/enum/SubCategory';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private http: HttpClient,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  keyword = 'Name';
  data: Product[];
  
  selectEvent(item: Product) {
    this.router.navigateByUrl('productview/' + item._id);
  }
 
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.

    let httpParams = new HttpParams()
        .set('searchString', val)
      this.http.get<Product[]>(server.serverUrl + 'product/search', { params: httpParams }).subscribe(products => {
        this.data = new Array<Product>();

        products.map((item, i)=>{
          item.CategoryName = Category.map(item.Category);
          item.CategoryTypeName = CategoryType.map(item.CategoryType);
          item.SubCategoryName = SubCategory.map(item.SubCategory);
          item.ImagePath.forEach((path, i) => {
            var splitPath = path.split('/');
            item.ImagePath[i] = 'assets/cartView/' + splitPath[splitPath.length - 1];
          });
        })

        this.data = products;
        this.changeDetectorRef.detectChanges();
    });
  }
  
  onFocused(e){
    // do something when input is focused
  }
}
