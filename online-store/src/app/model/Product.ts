import { Category } from './enum/category';
import { SubCategory } from './enum/SubCategory';
import { CategoryType } from './enum/CategoryType';
import { AdditionalInfo } from './AdditionalInfo';
import { Brand } from './enum/Brand';

export class Product{
    _id: any;
    Category: Category;
    CategoryName: string;
    CategoryType: CategoryType;
    CategoryTypeName: string;
    SubCategory: SubCategory;
    SubCategoryName: string;
    ImagePath: Array<String>;
    Name: String;
    Price: number;
    LastPrice: number;
    DiscountPrice: number;
    DiscountPercent: number;
    Barnd: Brand;
    BrandName: string;
    Sale: Boolean;
    SpecialOffer: Boolean;
    Sepcification: String;
    AdditinalInfos: Array<AdditionalInfo>;
    Comments: Comment;
    Quantity: number;
    Count: number = 1;
    skip?: number = 0;
    limit?: number = 0;
    isProductAvailable: boolean;
}