import { Purchased } from './Purchased';
import { PurchasedItem } from './PurchasedItem';

export class Order{
    purchasedItem:Array<PurchasedItem>;
    pickUp: boolean = false;
    deliverdStatus: boolean = false;
    totalPrice: number;
    paymentStatus: boolean;
    deliverDate: Date;
    paymentDate:Date;
    payOnline: boolean;
    address: string;
    deliverTo: string;
    deliverToPhone: string;
    purchasedUserDetails:Purchased;
}