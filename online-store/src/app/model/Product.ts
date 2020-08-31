import { Category } from './enum/category';
import { SubCategory } from './enum/SubCategory';
import { CategoryType } from './enum/CategoryType';
import { AdditionalInfo } from './AdditionalInfo';
import { Brand } from './enum/Brand';

export class Product{
    _id: any;
    Category?: Category;
    CategoryType?: CategoryType;
    SubCategory?: SubCategory;
    ImagePath?: Array<String>;
    public Name?: String;
    Price?: Number;
    Barnd?: Brand;
    Sale?: Boolean;
    SpecialOffer?: Boolean;
    Sepcification?: String;
    AdditinalInfos?: AdditionalInfo;
    Comments?: Comment;
    Quantity?: Number;
    skip?: Number = 0;
    limit?: Number = 0;
}