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
    private router: Router) { }

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

    
  }
  
  onFocused(e){
    // do something when input is focused
  }
}
