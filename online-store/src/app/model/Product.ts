import { Category } from './enum/category';
import { SubCategory } from './enum/SubCategory';
import { CategoryType } from './enum/CategoryType';
import { AdditionalInfo } from './AdditionalInfo';
import { Brand } from './enum/Brand';
import { Size } from './Size';
import { Sizes } from './enum/Sizes';

export class Product{

    constructor(){

        this.uniqueObjectIdentifier = Symbol();
    }

    _id: any;
    uniqueObjectIdentifier: symbol;
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
    Size:Array<Size>;
    Comments: Array<Comment>;
    Quantity: number;
    Count: number = 1;
    skip?: number = 0;
    limit?: number = 0;
    isProductAvailable: boolean;
    ViewCount: number;
    SaleCount: number;
    CreateDate: Date;
    selectedSize: Sizes;
    selectedSizeName: string;
    notExist = false;
    desc: string;
}