import { PurchasedItem } from './PurchasedItem';

export class Purchased{
    userId: any;
    purchasedItem:Array<PurchasedItem>;
    purchaseDate: Date;
    deliver:boolean;
    payOnline:boolean;
    address: string;
    deliverTo: string;
    deliverToPhone: string;
    userName: string;
    userNamePhone: string;
    
}