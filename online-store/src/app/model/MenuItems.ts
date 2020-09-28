import { CategoryItem } from './CategoryItem';
import { SubCategoryItem } from './SubCategoryItem';

export class MenuItems{
    _id: CategoryItem;
    CategoryName: string;
    SubCategory: Array<SubCategoryItem>;
    SubCategoryName: string;
    ShowSubMenu = false;
    
}