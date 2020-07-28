import { Category } from './enum/category';
import { SubCategory } from './enum/SubCategory';
import { CategoryType } from './enum/CategoryType';
import { AdditionalInfo } from './AdditionalInfo';
import { Brand } from './enum/Brand';

export class Product{
    Category?: Category;
    CategoryType?: CategoryType;
    SubCategory?: SubCategory;
    ImagePath?: String;
    public Name?: String;
    Price?: Number;
    Barnd?: Brand;
    Sale?: Boolean;
    SpecialOffer?: Boolean;
    Sepcification?: String;
    AdditinalInfos?: AdditionalInfo;
    Comments?: Comment;
    Quantity?: Number;
}