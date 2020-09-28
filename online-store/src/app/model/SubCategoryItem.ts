import { CategoryTypeItem } from './CategoryTypeItem';
import { CategoryType } from './enum/CategoryType';
import { SubCategory } from './enum/SubCategory';

export class SubCategoryItem{
    SubCategory:SubCategory;
    SubCategoryName: string;
    CategoryType:CategoryType;
    CategoryTypes:Array<CategoryTypeItem>;
}