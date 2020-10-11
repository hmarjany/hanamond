import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/model/enum/category';
import { CategoryType } from 'src/app/model/enum/CategoryType';
import { SubCategory } from 'src/app/model/enum/SubCategory';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  @Input() product: Product;
  @Input() productView = false;
  constructor() { 
    
  }

  ngOnInit(): void {

    this.product.CategoryName = Category.map(this.product.Category);
    this.product.CategoryTypeName = CategoryType.map(this.product.CategoryType);
    this.product.SubCategoryName = SubCategory.map(this.product.SubCategory);

  }

}
